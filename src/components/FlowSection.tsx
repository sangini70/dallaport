import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts, Post } from '../services/posts';
import { ChevronRight } from 'lucide-react';

interface Props {
  language?: string;
}

const STEPS_KO = ['입문', '이해', '비교', '판단', '실행'];
const STEPS_EN = ['Intro', 'Understand', 'Compare', 'Judge', 'Execute'];

export default function FlowSection({ language = 'ko' }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState('exchange-rate');

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await getPublishedPosts(language);
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, [language]);

  const isEn = language === 'en';
  const STEPS = isEn ? STEPS_EN : STEPS_KO;

  const categories = [
    { id: 'exchange-rate', name: isEn ? 'Exchange Rate' : '환율' },
    { id: 'dollar', name: isEn ? 'Dollar' : '달러' },
    { id: 'interest-rate', name: isEn ? 'Interest Rate' : '금리' },
    { id: 'etf', name: 'ETF' },
    { id: 'economy-basics', name: isEn ? 'Economy Basics' : '경제 기초' }
  ];

  const categoryPosts = [...posts]
    .filter(p => p.category === activeCategory)
    .sort((a, b) => {
      const dateA = a.createdAt?.toMillis?.() || 0;
      const dateB = b.createdAt?.toMillis?.() || 0;
      return dateA - dateB;
    });

  const basePath = isEn ? '/en/post' : '/post';

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">{isEn ? 'Learning Flow' : '흐름으로 보기'}</h2>
        <p className="text-gray-500 mt-1">{isEn ? 'Learn step-by-step from basics to execution by topic.' : '주제별로 기초부터 실행까지 단계별로 학습해보세요.'}</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              activeCategory === cat.id 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          
          {STEPS.map((stepName, index) => {
            const post = categoryPosts[index];
            return (
              <div key={stepName} className="flex-1 relative z-10 flex flex-col">
                <div className="flex items-center gap-3 mb-3 md:justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    post 
                      ? 'bg-white border-blue-500 text-blue-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`font-bold ${post ? 'text-gray-900' : 'text-gray-400'}`}>
                    {stepName}
                  </span>
                </div>
                
                {post ? (
                  <Link 
                    to={`${basePath}/${post.slug}`}
                    className="block bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:ring-1 hover:ring-blue-500 transition-all h-full"
                  >
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-2 mb-2">{post.title}</h4>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-auto">
                      {isEn ? 'Read' : '읽기'} <ChevronRight className="w-3 h-3" />
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 h-full border border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">{isEn ? 'Coming soon' : '준비 중입니다'}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
