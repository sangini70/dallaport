import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  track: string;
  title: string;
  isEn?: boolean;
}

export default function Breadcrumb({ track, title, isEn }: BreadcrumbProps) {
  const trackNamesKo: Record<string, string> = {
    'exchange-rate': '환율의 기초',
    'dollar': '달러의 구조',
    'interest-rate': '금리와 경제',
    'etf': 'ETF 실전 투자',
  };

  const trackNamesEn: Record<string, string> = {
    'exchange-rate': 'Basics of Exchange Rates',
    'dollar': 'Structure of the Dollar',
    'interest-rate': 'Interest Rates & Economy',
    'etf': 'Practical ETF Investing',
  };

  const trackName = isEn ? (trackNamesEn[track] || track) : (trackNamesKo[track] || track);
  const base = isEn ? '/en' : '';

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link to={base || '/'} className="hover:text-blue-600 flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <Link to={`${base}/flow-map`} className="hover:text-blue-600 font-medium">
        {trackName}
      </Link>
      <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
      <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">{title}</span>
    </nav>
  );
}
