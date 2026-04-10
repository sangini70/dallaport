import { useEffect } from 'react';

export function usePrefetchNext(nextSlug?: string, lang: 'ko' | 'en' = 'ko') {
  useEffect(() => {
    if (!nextSlug) return;
    
    // Prefetching JSON files is no longer applicable as we use Firestore.
    // We could prefetch the next post from Firestore here if needed,
    // but for now, we'll just return.
    
    return () => {
    };
  }, [nextSlug, lang]);
}
