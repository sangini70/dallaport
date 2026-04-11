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
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [stepPosts, setStepPosts] = useState<Post[]>([]);
  const [popularInTopic, setPopularInTopic] = useState<Post[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadRecommendations() {
      const allPosts = await getPublishedPosts(language);
      
      const categoryPosts = allPosts
        .filter(p => p.category === currentPost.category || (p.hubSlug && p.hubSlug === currentPost.hubSlug))
        .sort((a, b) => {
          const dateA = a.publishDate ? new Date(a.publishDate).getTime() : (a.createdAt?.toMillis?.() || 0);
          const dateB = b.publishDate ? new Date(b.publishDate).getTime() : (b.createdAt?.toMillis?.() || 0);
          return dateA - dateB;
        });

      // Find other posts in the same step
      if (currentPost.flowStep) {
        const sameStep = categoryPosts.filter(p => p.flowStep === currentPost.flowStep && p.slug !== currentPost.slug);
        setStepPosts(sameStep);
      }

      const currentIndex = categoryPosts.findIndex(p => p.slug === currentPost.slug);
      
      // Next Post
      if (currentIndex !== -1 && currentIndex < categoryPosts.length - 1) {
        setNextPost(categoryPosts[currentIndex + 1]);
      } else {
        setNextPost(null);
      }

      // Previous Post
      if (currentIndex > 0) {
        setPrevPost(categoryPosts[currentIndex - 1]);
      } else {
        setPrevPost(null);
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
      
      {stepPosts.length > 0 && (
        <section className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            {isEn ? `More in Step ${currentPost.flowStep}` : `이 단계(${currentPost.flowStep}단계)의 다른 글`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stepPosts.map((post) => (
              <Link key={post.slug} to={`${basePath}/${post.slug}`} className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-sm transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={getThumbnail(post)} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{getFallbackDescription(post)}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

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

      {prevPost && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">PREV</span>
            <h3 className="text-xl font-bold text-gray-900">{isEn ? 'Previous Step' : '이전 단계로 돌아가기'}</h3>
          </div>
          <Link to={`${basePath}/${prevPost.slug}`} className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-400 hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row gap-6 items-center opacity-70 group-hover:opacity-100 transition-opacity">
              <div className="w-full md:w-1/3 aspect-[16/9] rounded-xl overflow-hidden bg-gray-200 shrink-0">
                <img src={getThumbnail(prevPost)} alt={prevPost.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{prevPost.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{getFallbackDescription(prevPost)}</p>
                <div className="flex items-center text-gray-500 font-bold text-sm gap-1">
                  <ChevronRight className="w-4 h-4 rotate-180" /> {isEn ? 'Back to Previous' : '이전으로 돌아가기'}
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
