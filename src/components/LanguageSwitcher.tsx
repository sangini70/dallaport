import { Link, useLocation } from 'react-router-dom';

export default function LanguageSwitcher() {
  const location = useLocation();
  const path = location.pathname;
  
  const isEn = path.startsWith('/en');
  
  const togglePath = isEn 
    ? path.replace(/^\/en/, '') || '/' 
    : `/en${path === '/' ? '' : path}`;

  return (
    <Link 
      to={togglePath}
      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
    >
      {isEn ? 'Korean' : 'English'}
    </Link>
  );
}
