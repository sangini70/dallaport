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

export default function EnFlowStep() {
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
        if (data && data.status === 'published' && data.language === 'en') {
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

  if (loading) return <div className="py-20 text-center text-gray-500">Loading content...</div>;
  if (error || !post) return <div className="py-20 text-center text-red-500">Content not found.</div>;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://dallaport.com';

  const metaDescription = getSeoDescription(post.seoDescription, post.shortDescription, post.contentHtml);

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <Helmet>
        <title>{post.title} | Dallaport</title>
        <meta name="description" content={metaDescription} />
        <link rel="alternate" hrefLang="ko" href={`${domain}/post/${actualSlug}`} />
        <link rel="alternate" hrefLang="en" href={`${domain}/en/post/${actualSlug}`} />
        <link rel="canonical" href={`${domain}/en/post/${actualSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": metaDescription,
            "author": {
              "@type": "Organization",
              "name": "Dallaport"
            }
          })}
        </script>
      </Helmet>

      <Breadcrumb track={post.category} title={post.title} isEn={true} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 mb-4 leading-tight">
        {post.title}
      </h1>

      <AdSlot position="top" />

      <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
        {post.shortDescription}
      </p>

      <div className="prose prose-lg prose-blue max-w-none my-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <AdSlot position="middle" />

      {post.category === 'exchange-rate' && <CurrencyCalculator isEn={true} />}

      <ShareButtons url={currentUrl} title={post.title} />

      <AdSlot position="bottom" />

      <PostRecommendations currentPost={post} language="en" />
    </article>
  );
}
