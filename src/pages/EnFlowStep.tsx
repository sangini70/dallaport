import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from '../components/Breadcrumb';
import ShareButtons from '../components/ShareButtons';
import AdSlot from '../components/AdSlot';
import NextStep from '../components/NextStep';
import CurrencyCalculator from '../components/CurrencyCalculator';
import HookBlock from '../components/HookBlock';
import RelatedPosts from '../components/RelatedPosts';
import { useFlowData } from '../hooks/useFlowData';
import { usePrefetchNext } from '../hooks/usePrefetchNext';
import { getSeoDescription } from '../utils/seoFallback';

export default function EnFlowStep() {
  const { slug } = useParams<{ slug: string }>();
  const actualSlug = slug || 'exchange-rate-basics';
  
  const { data, loading, error } = useFlowData(actualSlug, 'en');

  usePrefetchNext(data?.next_slug, 'en');

  if (loading) return <div className="py-20 text-center text-gray-500">Loading content...</div>;
  if (error || !data) return <div className="py-20 text-center text-red-500">Content not found.</div>;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://dallaport.com';

  const metaDescription = getSeoDescription(data.seoDescription, data.shortDescription, data.content);

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <Helmet>
        <title>{data.title} | dallaport</title>
        <meta name="description" content={metaDescription} />
        <link rel="alternate" hrefLang="ko" href={`${domain}/post/${actualSlug}`} />
        <link rel="alternate" hrefLang="en" href={`${domain}/en/post/${actualSlug}`} />
        <link rel="canonical" href={`${domain}/en/post/${actualSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.title,
            "description": metaDescription,
            "author": {
              "@type": "Organization",
              "name": "dallaport"
            }
          })}
        </script>
      </Helmet>

      <Breadcrumb track={data.track} title={data.title} isEn={true} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 mb-4 leading-tight">
        {data.title}
      </h1>
      
      <HookBlock hook={(data as any).hook} />

      <AdSlot position="top" />

      <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
        {data.shortDescription || data.summary}
      </p>

      <div className="prose prose-lg prose-blue max-w-none my-10">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>

      <AdSlot position="middle" />

      {data.track === 'exchange-rate' && <CurrencyCalculator />}

      <ShareButtons url={currentUrl} title={data.title} />

      <AdSlot position="bottom" />

      <NextStep 
        nextSlug={data.next_slug} 
        prevSlug={data.prev_slug} 
        currentSlug={actualSlug}
        track={data.track}
        isEn={true} 
      />

      <RelatedPosts relatedSlugs={data.related} isEn={true} />
    </article>
  );
}
