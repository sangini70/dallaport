import { useState, useEffect } from 'react';

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
}

export function useFlowData(slug: string, lang: 'ko' | 'en' = 'ko') {
  const [data, setData] = useState<FlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/data/${lang}/detail/${slug}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(json => {
        setData(json);
        setError(null);
      })
      .catch(err => {
        console.error('Failed to load flow data:', err);
        setError(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, lang]);

  return { data, loading, error };
}
