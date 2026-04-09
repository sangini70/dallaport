import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { fetchSearchIndex } from '../services/publicData';

interface SearchResult {
  slug: string;
  title: string;
  summary: string;
  track: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allData, setAllData] = useState<SearchResult[]>([]);

  useEffect(() => {
    fetchSearchIndex('ko')
      .then(data => setAllData(data.items || []))
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
      item.summary.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query, allData]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Helmet>
        <title>검색 | 딸라포트</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">무엇을 찾으시나요?</h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="환율, 금리, 달러 등 검색어 입력"
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none transition-colors"
          autoFocus
        />
      </div>

      <div>
        {query && results.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            "{query}"에 대한 검색 결과가 없습니다.
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">검색 결과 {results.length}건</h2>
            {results.map((item) => (
              <Link 
                key={item.slug} 
                to={`/${item.slug}`}
                className="block p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-xs font-bold text-blue-600 mb-2 uppercase">{item.track}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
