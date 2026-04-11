import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts, Post } from '../services/posts';

interface Props {
  language?: string;
}

export default function PopularPostsSection({ language = 'ko' }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'newbie'>('today');

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await getPublishedPosts(language);
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, [language]);

  const now = new Date().getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  const getPostDate = (p: Post) => p.publishDate ? new Date(p.publishDate).getTime() : (p.createdAt?.toMillis?.() || 0);

  const todayPosts = [...posts]
    .filter(p => (now - getPostDate(p)) <= 3 * dayMs)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  const weekPosts = [...posts]
    .filter(p => (now - getPostDate(p)) <= 14 * dayMs)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  const newbiePosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  let displayPosts = todayPosts;
  if (activeTab === 'week') displayPosts = weekPosts;
  if (activeTab === 'newbie') displayPosts = newbiePosts;

  if (displayPosts.length === 0) {
    displayPosts = newbiePosts;
  }

  const getThumbnail = (post: Post) => {
    return post.thumbnail || 'https://picsum.photos/seed/dallaport/800/600';
  };

  const isEn = language === 'en';

  const getCategoryName = (cat: string) => {
    const map: Record<string, string> = {
      'exchange-rate': isEn ? 'Exchange Rate' : '환율',
      'dollar': isEn ? 'Dollar' : '달러',
      'interest-rate': isEn ? 'Interest Rate' : '금리',
      'etf': 'ETF',
      'economy-basics': isEn ? 'Economy Basics' : '경제 기초'
    };
    return map[cat] || cat;
  };

  if (posts.length === 0) return null;

  const basePath = isEn ? '/en' : '';

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-gray-900">{isEn ? 'Trending Posts' : '많이 보는 글'}</h2>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'today' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {isEn ? 'Today' : '오늘'}
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {isEn ? 'This Week' : '이번 주'}
          </button>
          <button
            onClick={() => setActiveTab('newbie')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'newbie' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {isEn ? 'New Visitor' : '처음 방문자'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayPosts.map((post, i) => (
          <Link key={post.id} to={`${basePath}/${post.slug}`} className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
              <img src={getThumbnail(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center font-bold text-gray-900 text-sm shadow-sm">
                {i + 1}
              </div>
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-blue-600 tracking-wider bg-blue-50 px-2 py-1 rounded mb-3 inline-block">
                {getCategoryName(post.category)}
              </span>
              <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
