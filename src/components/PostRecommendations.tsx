import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts, getPostBySlug, Post } from '../services/posts';
import { ChevronRight } from 'lucide-react';

interface Props {
  currentPost: Post;
  language?: string;
}

export default function PostRecommendations({ currentPost, language = 'ko' }: Props) {
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [popularInTopic, setPopularInTopic] = useState<Post[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadRecommendations() {
      const allPosts = await getPublishedPosts(language);
      
      const categoryPosts = allPosts
        .filter(p => p.category === currentPost.category)
        .sort((a, b) => {
          const dateA = a.createdAt?.toMillis?.() || 0;
          const dateB = b.createdAt?.toMillis?.() || 0;
          return dateA - dateB;
        });

      const currentIndex = categoryPosts.findIndex(p => p.slug === currentPost.slug);
      if (currentIndex !== -1 && currentIndex < categoryPosts.length - 1) {
        setNextPost(categoryPosts[currentIndex + 1]);
      } else {
        setNextPost(null);
      }

      const popular = [...categoryPosts]
        .filter(p => p.slug !== currentPost.slug && p.slug !== nextPost?.slug)
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3);
      setPopularInTopic(popular);

      const relatedSlugs = (currentPost as any).related || [];
      if (relatedSlugs.length > 0) {
        const related = await Promise.all(relatedSlugs.map((slug: string) => getPostBySlug(slug)));
        setRelatedPosts(related.filter(Boolean) as Post[]);
      } else {
        const overallPopular = [...allPosts]
          .filter(p => p.slug !== currentPost.slug && p.category !== currentPost.category)
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 3);
        setRelatedPosts(overallPopular);
      }
    }

    loadRecommendations();
  }, [currentPost, language]);

  const getThumbnail = (post: Post) => post.thumbnail || 'https://picsum.photos/seed/dallaport/800/600';
  const getFallbackDescription = (post: Post) => {
    if (post.seoDescription) return post.seoDescription;
    if (post.shortDescription) return post.shortDescription;
    const stripped = post.contentHtml?.replace(/<[^>]+>/g, '') || '';
    return stripped.substring(0, 100) + (stripped.length > 100 ? '...' : '');
  };

  const isEn = language === 'en';
  const basePath = isEn ? '/en/post' : '/post';

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 flex flex-col gap-12">
      
      {nextPost && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">NEXT</span>
            <h3 className="text-xl font-bold text-gray-900">{isEn ? 'Next Step' : '다음 단계로 넘어가기'}</h3>
          </div>
          <Link to={`${basePath}/${nextPost.slug}`} className="group block bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 aspect-[16/9] rounded-xl overflow-hidden bg-gray-200 shrink-0">
                <img src={getThumbnail(nextPost)} alt={nextPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{nextPost.title}</h4>
                <p className="text-gray-600 line-clamp-2 mb-4">{getFallbackDescription(nextPost)}</p>
                <div className="flex items-center text-blue-600 font-bold text-sm gap-1">
                  {isEn ? 'Continue Reading' : '이어서 읽기'} <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {popularInTopic.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6">{isEn ? 'Popular in this Topic' : '같은 주제 인기 글'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {popularInTopic.map((post) => (
              <Link key={post.slug} to={`${basePath}/${post.slug}`} className="group block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                  <img src={getThumbnail(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{getFallbackDescription(post)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6">{isEn ? 'Recommended to Read Together' : '함께 읽으면 좋은 글'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.slug} to={`${basePath}/${post.slug}`} className="group block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                  <img src={getThumbnail(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{getFallbackDescription(post)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
