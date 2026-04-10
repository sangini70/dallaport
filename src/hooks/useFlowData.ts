import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface FlowData {
  slug: string;
  track: string;
  title: string;
  summary: string;
  content: string;
  prev_slug?: string;
  next_slug?: string;
  hub_slug?: string;
  hook?: string;
  core_keyword?: string;
  related?: string[];
  seoDescription?: string;
  shortDescription?: string;
  contentHtml?: string;
  category?: string;
  thumbnail?: string;
}

export function useFlowData(slug: string, lang: 'ko' | 'en' = 'ko') {
  const [data, setData] = useState<FlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    
    async function fetchPost() {
      try {
        const docRef = doc(db, 'posts', slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const postData = docSnap.data();
          // Ensure it's published and matches language
          if (postData.status === 'published' && postData.language === lang) {
            // Map Firestore fields to FlowData format
            setData({
              slug: postData.slug || slug,
              track: postData.category || '',
              title: postData.title || '',
              summary: postData.shortDescription || '',
              content: postData.contentHtml || '', // Use contentHtml for markdown/html
              seoDescription: postData.seoDescription || '',
              shortDescription: postData.shortDescription || '',
              contentHtml: postData.contentHtml || '',
              category: postData.category || '',
              thumbnail: postData.thumbnail || '',
              // Mock or empty for fields not in Firestore yet
              prev_slug: '',
              next_slug: '',
              related: []
            });
            setError(null);
          } else {
            throw new Error('Post not found or not published');
          }
        } else {
          throw new Error('Not found');
        }
      } catch (err: any) {
        console.error('Failed to load flow data:', err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, lang]);

  return { data, loading, error };
}
