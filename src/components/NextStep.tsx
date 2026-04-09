import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Map } from 'lucide-react';

interface NextStepProps {
  nextSlug?: string;
  prevSlug?: string;
  currentSlug?: string;
  track?: string;
  isEn?: boolean;
}

export default function NextStep({ nextSlug, prevSlug, isEn }: NextStepProps) {
  const base = isEn ? '/en' : '';

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {isEn ? 'Continue Learning' : '다음 단계로 계속하기'}
        </h3>
        <Link to={`${base}/flow-map`} className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1">
          <Map className="w-4 h-4" /> {isEn ? 'Flow Map' : '전체 흐름도'}
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {prevSlug && (
          <Link 
            to={`${base}/post/${prevSlug}`}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-6 rounded-2xl border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-bold transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> {isEn ? 'Previous Step' : '이전 단계'}
          </Link>
        )}
        
        {nextSlug ? (
          <Link 
            to={`${base}/post/${nextSlug}`}
            className="flex-[2] flex items-center justify-between px-8 py-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-bold transition-all shadow-lg hover:shadow-xl group"
          >
            <div className="flex flex-col text-left">
              <span className="text-blue-200 text-xs tracking-widest uppercase mb-1">Next Step</span>
              <span className="text-xl">{isEn ? 'Go to Next Content' : '다음 콘텐츠 읽기'}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <ArrowRight className="w-6 h-6" />
            </div>
          </Link>
        ) : (
          <div className="flex-[2] flex items-center justify-center px-8 py-6 rounded-2xl bg-gray-100 text-gray-500 font-bold border border-gray-200">
            {isEn ? 'You have completed this track!' : '이 트랙의 마지막 콘텐츠입니다.'}
          </div>
        )}
      </div>
    </div>
  );
}
