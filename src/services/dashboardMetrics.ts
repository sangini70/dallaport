import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface DashboardMetrics {
  totalViews: number;
  averageCtr: string;
  topPosts: any[];
  lowCtrPosts: any[];
  highCtrLowViewsPosts: any[];
  viewsByDate: { date: string; views: number }[];
  viewsByHour: { hour: string; views: number }[];
}

export async function fetchDashboardMetrics(language: string = 'ko'): Promise<DashboardMetrics> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('language', '==', language));
    const snapshot = await getDocs(q);
    
    const posts: any[] = [];
    let totalViews = 0;
    let totalClicks = 0;
    let totalImpressions = 0;

    const viewsByDateMap: Record<string, number> = {};
    const viewsByHourMap: Record<string, number> = {};

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      viewsByDateMap[dateStr] = 0;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Exclude dummy/seed data based on titles if they exist in DB
      const dummyTitles = [
        '환율이란 무엇인가?',
        '환율과 금리의 상관관계',
        '고환율 시대, 시장의 움직임',
        '환율 변동성을 활용한 투자 전략'
      ];
      
      if (dummyTitles.includes(data.title)) {
        return; // Skip dummy data
      }

      const views = data.views || 0;
      const impressions = data.impressions || 0;
      const clicks = data.clicks || 0;
      const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
      
      posts.push({ id: doc.id, ...data, views, impressions, clicks, ctr });
      totalViews += views;
      totalClicks += clicks;
      totalImpressions += impressions;

      const dateObj = data.publishedAt ? new Date(data.publishedAt) : (data.publishDate ? new Date(data.publishDate) : (data.createdAt?.toMillis ? new Date(data.createdAt.toMillis()) : new Date()));
      
      const dateStr = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      if (viewsByDateMap[dateStr] !== undefined) {
        viewsByDateMap[dateStr] += views;
      }

      const hour = dateObj.getHours();
      const exactHourStr = `${hour}시`;
      if (viewsByHourMap[exactHourStr] === undefined) {
          viewsByHourMap[exactHourStr] = 0;
      }
      viewsByHourMap[exactHourStr] += views;
    });

    const averageCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0.00%';
    
    // Sort for top posts by views
    const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
    
    // Sort for low CTR posts (impressions >= 10)
    const lowCtrPosts = [...posts]
      .filter(p => p.impressions >= 10)
      .sort((a, b) => a.ctr - b.ctr)
      .slice(0, 5);

    // High CTR, Low Views
    const avgViews = posts.length > 0 ? totalViews / posts.length : 0;
    const avgCtrNum = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    
    const highCtrLowViewsPosts = [...posts]
      .filter(p => p.ctr >= avgCtrNum && p.views < avgViews)
      .sort((a, b) => b.ctr - a.ctr)
      .slice(0, 5);

    const viewsByDate = Object.keys(viewsByDateMap).map(date => ({ date, views: viewsByDateMap[date] }));
    
    const viewsByHour = [];
    for (let i = 0; i < 24; i++) {
        const hStr = `${i}시`;
        viewsByHour.push({ hour: hStr, views: viewsByHourMap[hStr] || 0 });
    }

    return {
      totalViews,
      averageCtr,
      topPosts,
      lowCtrPosts,
      highCtrLowViewsPosts,
      viewsByDate,
      viewsByHour
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {
      totalViews: 0,
      averageCtr: '0.00%',
      topPosts: [],
      lowCtrPosts: [],
      highCtrLowViewsPosts: [],
      viewsByDate: [],
      viewsByHour: []
    };
  }
}
