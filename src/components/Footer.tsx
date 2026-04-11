import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isEn = location.pathname.startsWith('/en');

  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-6 mb-6">
          <Link 
            to={isEn ? '/en/privacy' : '/privacy'} 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isEn ? 'Privacy Policy' : '개인정보처리방침'}
          </Link>
          <Link 
            to={isEn ? '/en/contact' : '/contact'} 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isEn ? 'Contact' : '문의하기'}
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {isEn 
            ? 'The content on this site is for informational purposes only. Investment decisions and results are the responsibility of the user.' 
            : '본 사이트의 콘텐츠는 정보 제공 목적이며, 투자 판단과 결과는 이용자 본인에게 있습니다.'}
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} dallaport. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
