import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const location = useLocation();
  const isEn = location.pathname.startsWith('/en');
  const base = isEn ? '/en' : '';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={base || '/'} className="text-lg font-bold tracking-widest text-gray-900 uppercase">
          dallaport
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            About
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Contact
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
