export interface DashboardMetrics {
  totalViews: number;
  averageCtr: string;
  topPosts: any[];
  lowCtrPosts: any[];
}

export async function fetchDashboardMetrics(language: string = 'ko'): Promise<DashboardMetrics> {
  try {
    // 1. Fetch flow-index.json
    const indexRes = await fetch(`/data/${language}/flow-index.json`);
    if (!indexRes.ok) throw new Error('Failed to fetch flow-index');
    const flowIndex = await indexRes.json();

    // 2. Collect all slugs
    const slugs = new Set<string>();
    for (const track in flowIndex) {
      flowIndex[track].forEach((slug: string) => slugs.add(slug));
    }

    // 3. Fetch all detail JSONs
    const posts = [];
    let totalViews = 0;
    let totalCtr = 0;
    let ctrCount = 0;

    for (const slug of slugs) {
      try {
        const detailRes = await fetch(`/data/${language}/detail/${slug}.json`);
        if (detailRes.ok) {
          const post = await detailRes.json();
          const views = post.views || 0;
          const ctr = post.ctr || 0;
          
          posts.push({ ...post, views, ctr });
          totalViews += views;
          totalCtr += ctr;
          ctrCount++;
        }
      } catch (e) {
        console.error(`Failed to fetch detail for ${slug}`, e);
      }
    }

    // 4. Calculate metrics
    const averageCtr = ctrCount > 0 ? (totalCtr / ctrCount).toFixed(1) + '%' : '0%';
    
    // 5. Sort for top posts
    const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
    
    // 6. Sort for low CTR posts
    const lowCtrPosts = [...posts].sort((a, b) => a.ctr - b.ctr).slice(0, 5);

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
