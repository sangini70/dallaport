import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { getPublishedPosts, Post } from '../services/posts';

export default function EnSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Post[]>([]);
  const [allData, setAllData] = useState<Post[]>([]);

  useEffect(() => {
    getPublishedPosts('en')
      .then(data => setAllData(data))
      .catch(err => console.error('Failed to load search index', err));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      (item.shortDescription && item.shortDescription.toLowerCase().includes(lowerQuery)) ||
      (item.contentHtml && item.contentHtml.toLowerCase().includes(lowerQuery)) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
      (item.tags && item.tags.toLowerCase().includes(lowerQuery))
    );
    setResults(filtered);
    
    // Update URL without full reload
    if (query !== initialQuery) {
      setSearchParams({ q: query }, { replace: true });
    }
  }, [query, allData, setSearchParams, initialQuery]);

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

  const getFallbackDescription = (post: Post) => {
    if (post.seoDescription) return post.seoDescription;
    if (post.shortDescription) return post.shortDescription;
    const stripped = post.contentHtml?.replace(/<[^>]+>/g, '') || '';
    return stripped.substring(0, 100) + (stripped.length > 100 ? '...' : '');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Helmet>
        <title>Search | dallaport</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">What are you looking for?</h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search exchange rates, interest rates, dollar, etc."
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none transition-colors"
          autoFocus
        />
      </div>

      <div>
        {query && results.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No results found for "{query}".
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{results.length} Results</h2>
            {results.map((item) => (
              <Link 
                key={item.slug} 
                to={`/en/post/${item.slug}`}
                className="block p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-xs font-bold text-blue-600 mb-2 uppercase">{getCategoryName(item.category)}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{getFallbackDescription(item)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
