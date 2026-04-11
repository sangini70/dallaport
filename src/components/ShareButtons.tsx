import { useEffect } from 'react';
import { Share2, Link as LinkIcon } from 'lucide-react';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
}

export default function ShareButtons({ url, title, description, image }: ShareButtonsProps) {
  const KAKAO_JS_KEY = '422a1b42b6e1b35f9a666c2ea365f57e';
  
  // Ensure we use the production domain for sharing
  const shareUrl = url.includes('localhost') 
    ? url.replace(/https?:\/\/localhost:\d+/, 'https://dallaport.com')
    : url;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('링크가 복사되었습니다.');
  };

  const handleKakaoShare = () => {
    if (!window.Kakao) return;
    
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description || '딸라포트에서 환율과 달러의 구조를 배워보세요.',
        imageUrl: image || 'https://picsum.photos/seed/dallaport/800/600',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  const handleXShare = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2 py-4 border-t border-b border-gray-100 my-6">
      <span className="text-sm text-gray-500 flex items-center gap-1 mr-2">
        <Share2 className="w-4 h-4" /> 공유하기
      </span>
      <button 
        onClick={handleCopyLink} 
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors" 
        title="링크 복사"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      
      <button 
        onClick={handleKakaoShare}
        className="px-3 py-1.5 rounded-full bg-[#FEE500] text-[#000000] text-xs font-bold hover:bg-[#FEE500]/90 transition-colors"
      >
        카카오
      </button>
      
      <button 
        onClick={handleXShare}
        className="px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold hover:bg-black/90 transition-colors"
      >
        X
      </button>
      
      <button 
        onClick={handleFacebookShare}
        className="px-3 py-1.5 rounded-full bg-[#1877F2] text-white text-xs font-bold hover:bg-[#1877F2]/90 transition-colors"
      >
        페이스북
      </button>
    </div>
  );
}
