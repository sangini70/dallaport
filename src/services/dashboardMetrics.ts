import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface DashboardMetrics {
  totalViews: number;
  averageCtr: string;
  topPosts: any[];
  lowCtrPosts: any[];
}

export async function fetchDashboardMetrics(language: string = 'ko'): Promise<DashboardMetrics> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('language', '==', language));
    const snapshot = await getDocs(q);
    
    const posts: any[] = [];
    let totalViews = 0;
    let totalCtr = 0;
    let ctrCount = 0;

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
      const ctr = data.ctr || 0;
      
      posts.push({ id: doc.id, ...data, views, ctr });
      totalViews += views;
      totalCtr += ctr;
      ctrCount++;
    });

    const averageCtr = ctrCount > 0 ? (totalCtr / ctrCount).toFixed(1) + '%' : '0%';
    
    // Sort for top posts by views
    const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
    
    // Sort for low CTR posts (only consider posts with some views/impressions to be meaningful)
    // Assuming we want to improve posts that are actually seen but not clicked much.
    // If all have 0 views, it will just show the ones with 0 ctr.
    const lowCtrPosts = [...posts]
      .filter(p => p.status === 'published') // Only care about published posts for CTR improvement
      .sort((a, b) => a.ctr - b.ctr)
      .slice(0, 5);

    return {
      totalViews,
      averageCtr,
      topPosts,
      lowCtrPosts
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {
      totalViews: 0,
      averageCtr: '0%',
      topPosts: [],
      lowCtrPosts: []
    };
  }
}
