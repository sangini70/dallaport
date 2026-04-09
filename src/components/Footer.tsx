export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-6 mb-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Contact</a>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          본 사이트의 콘텐츠는 정보 제공 목적이며, 투자 판단과 결과는 이용자 본인에게 있습니다.
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} dallaport. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
