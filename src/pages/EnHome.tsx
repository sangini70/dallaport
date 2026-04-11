import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPublishedPosts, Post } from '../services/posts';
import SearchBar from '../components/SearchBar';
import FlowSection from '../components/FlowSection';
import PopularPostsSection from '../components/PopularPostsSection';
import YoutubeAwareness from '../components/YoutubeAwareness';

export default function EnHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await getPublishedPosts('en');
      setPosts(fetchedPosts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  // Latest + Good Reaction
  const latestPosts = [...posts]
    .slice(0, 10)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 6);

  const getCategoryName = (cat: string) => {
    const map: Record<string, string> = {
      'exchange-rate': 'Exchange Rate',
      'dollar': 'Dollar',
      'interest-rate': 'Interest Rate',
      'etf': 'ETF',
      'economy-basics': 'Economy Basics'
    };
    return map[cat] || cat;
  };

  const getFallbackDescription = (post: Post) => {
    if (post.seoDescription) return post.seoDescription;
    if (post.shortDescription) return post.shortDescription;
    const stripped = post.contentHtml?.replace(/<[^>]+>/g, '') || '';
    return stripped.substring(0, 100) + (stripped.length > 100 ? '...' : '');
  };

  const getThumbnail = (post: Post) => {
    return post.thumbnail || 'https://picsum.photos/seed/dallaport/800/600';
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-16 py-8 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>dallaport | Understanding Exchange Rates and the Dollar</title>
        <meta name="description" content="dallaport - Easily understand the structure of exchange rates, interest rates, the dollar, and ETFs." />
      </Helmet>

      {/* Hero with Search */}
      <section className="flex flex-col items-center text-center pt-8 pb-4">
        <div className="flex items-center gap-4 text-sm font-bold text-blue-600 tracking-wider mb-6">
          <span className="w-8 h-px bg-blue-300"></span>
          DALLAPORT GUIDE
          <span className="w-8 h-px bg-blue-300"></span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
          Financial Guide to Understanding<br />
          Exchange Rates & the Dollar
        </h1>
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed mb-8">
          Learn complex financial concepts step-by-step easily at Dallaport.
        </p>
        
        <SearchBar language="en" />
      </section>

      <div className="-mt-8">
        <YoutubeAwareness language="en" />
      </div>

      <FlowSection language="en" />

      {!loading && <PopularPostsSection language="en" />}

      {/* Latest */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Trending Latest Posts</h2>
          <p className="text-gray-500 mt-1">Recently published posts with good reactions.</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : latestPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500">
            No posts available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
            {latestPosts.map((post) => (
              <Link key={post.id} to={`/en/${post.slug}`} className="group block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                  <img src={getThumbnail(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider bg-gray-100 px-2 py-1 rounded shrink-0">
                    {getCategoryName(post.category)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                  {getFallbackDescription(post)}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-400">{formatDate(post.publishDate)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Calculator Banner */}
      <section>
        <div className="bg-blue-50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Practical Exchange Rate Calculator</h2>
            <p className="text-gray-600">
              Check the <strong className="text-blue-600">real perceived exchange rate</strong> reflecting the actual exchange structure (fees, preferential rates).
            </p>
          </div>
          <Link to="/en/calculator" className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shrink-0 shadow-md text-center">
            Go to Calculator &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
}
