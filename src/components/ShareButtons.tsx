import { Share2, Link as LinkIcon } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다.');
  };

  return (
    <div className="flex items-center gap-2 py-4 border-t border-b border-gray-100 my-6">
      <span className="text-sm text-gray-500 flex items-center gap-1 mr-2">
        <Share2 className="w-4 h-4" /> 공유하기
      </span>
      <button onClick={handleCopyLink} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" title="링크 복사">
        <LinkIcon className="w-4 h-4" />
      </button>
      {/* 카카오, X, 페이스북 등은 실제 SDK 연동 필요 */}
      <button className="px-3 py-1.5 rounded-full bg-[#FEE500] text-[#000000] text-xs font-bold hover:bg-[#FEE500]/90 transition-colors">
        카카오
      </button>
      <button className="px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold hover:bg-black/90 transition-colors">
        X
      </button>
      <button className="px-3 py-1.5 rounded-full bg-[#1877F2] text-white text-xs font-bold hover:bg-[#1877F2]/90 transition-colors">
        페이스북
      </button>
    </div>
  );
}
