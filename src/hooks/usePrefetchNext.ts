import { useEffect } from 'react';

export function usePrefetchNext(nextSlug?: string, lang: 'ko' | 'en' = 'ko') {
  useEffect(() => {
    if (!nextSlug) return;
    
    const url = `/data/${lang}/detail/${nextSlug}.json`;
    
    // 간단한 prefetch 로직
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'fetch';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, [nextSlug, lang]);
}
