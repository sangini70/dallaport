import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import ShareButtons from '../components/ShareButtons';
import AdSlot from '../components/AdSlot';
import CurrencyCalculator from '../components/CurrencyCalculator';
import PostRecommendations from '../components/PostRecommendations';
import { getPostBySlug, Post } from '../services/posts';
import { getSeoDescription } from '../utils/seoFallback';

export default function FlowStep() {
  const { slug } = useParams<{ slug: string }>();
  const actualSlug = slug || 'exchange-rate-basics';
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        const data = await getPostBySlug(actualSlug);
        if (data && data.status === 'published' && data.language === 'ko') {
          setPost(data);
        } else {
          setError(new Error('Not found'));
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [actualSlug]);

  if (loading) return <div className="py-20 text-center text-gray-500">콘텐츠를 불러오는 중입니다...</div>;
  if (error || !post) return <div className="py-20 text-center text-red-500">콘텐츠를 찾을 수 없습니다.</div>;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://dallaport.com';

  const metaDescription = getSeoDescription(post.seoDescription, post.shortDescription, post.contentHtml);
  const ogImage = post.thumbnail 
    ? (post.thumbnail.startsWith('http') ? post.thumbnail : `${domain}${post.thumbnail}`)
    : 'https://picsum.photos/seed/dallaport/1200/630';

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <Helmet>
        <title>{post.title} | 딸라포트</title>
        <meta name="description" content={metaDescription} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${post.title} | 딸라포트`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${domain}/${actualSlug}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | 딸라포트`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="alternate" hrefLang="ko" href={`${domain}/${actualSlug}`} />
        <link rel="alternate" hrefLang="en" href={`${domain}/en/${actualSlug}`} />
        <link rel="canonical" href={`${domain}/${actualSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": metaDescription,
            "image": ogImage,
            "author": {
              "@type": "Organization",
              "name": "딸라포트"
            }
          })}
        </script>
      </Helmet>

      <Breadcrumb track={post.category} title={post.title} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 mb-4 leading-tight">
        {post.title}
      </h1>

      <AdSlot position="top" />

      <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
        {post.shortDescription}
      </p>

      <div className="prose prose-lg prose-blue max-w-none my-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <AdSlot position="middle" />

      {post.category === 'exchange-rate' && <CurrencyCalculator />}

      <ShareButtons 
        url={currentUrl} 
        title={post.title} 
        description={post.shortDescription || metaDescription}
        image={ogImage}
      />

      <AdSlot position="bottom" />

      <PostRecommendations currentPost={post} language="ko" />
    </article>
  );
}
