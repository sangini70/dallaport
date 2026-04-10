import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPublishedPosts, Post } from '../services/posts';

export default function EnCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

  const categoryName = getCategoryName(categoryId || '');

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const fetchedPosts = await getPublishedPosts('en');
      // Filter by category
      const filtered = fetchedPosts.filter(p => p.category === categoryId);
      setPosts(filtered);
      setLoading(false);
    }
    loadPosts();
  }, [categoryId]);

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
    <div className="flex flex-col gap-12 py-12 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>{categoryName} | dallaport</title>
        <meta name="description" content={`Latest posts and guides for ${categoryName}.`} />
      </Helmet>

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{categoryName}</h1>
        <p className="text-gray-600">Check out the latest posts and guides on this topic.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500">
          No posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/en/post/${post.slug}`} className="group block">
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
    </div>
  );
}
