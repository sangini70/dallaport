import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFlowIndex } from '../services/publicData';

export default function FlowMap() {
  const [flowData, setFlowData] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlowIndex('ko')
      .then(data => {
        setFlowData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-8 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>전체 흐름도 | 딸라포트</title>
        <meta name="description" content="딸라포트(dallaport)의 전체 학습 흐름도를 확인하세요." />
      </Helmet>

      <div className="mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest mb-2 uppercase">Flow Map</div>
        <h1 className="text-3xl font-extrabold text-gray-900">전체 학습 흐름도</h1>
      </div>
      
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
        <p className="text-gray-600 mb-8 leading-relaxed">
          딸라포트의 콘텐츠는 순차적으로 학습할 때 가장 효과적입니다. 아래 흐름도를 따라가며 금융 지식을 완성해보세요.
        </p>

        {loading ? (
          <div className="py-10 text-center text-gray-500">흐름도를 불러오는 중입니다...</div>
        ) : (
          <div className="space-y-12">
            {Object.entries(flowData).map(([track, slugs]) => (
              <div key={track} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 capitalize flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  {track === 'exchange-rate' ? '환율' : track}
                </h2>
                
                <div className="relative pl-6 border-l-2 border-gray-200 ml-1 space-y-6">
                  {slugs.map((slug, index) => (
                    <div key={slug} className="relative">
                      {/* Tree branch line */}
                      <div className="absolute -left-6 top-4 w-6 h-0.5 bg-gray-200"></div>
                      
                      <Link 
                        to={`/post/${slug}`}
                        className="block bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {/* Display slug as title for now, ideally we'd fetch titles */}
                              {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">/post/{slug}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
