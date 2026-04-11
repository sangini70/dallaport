import { useEffect } from 'react';
import { Share2, Link as LinkIcon, Facebook } from 'lucide-react';

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
    const initKakao = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          try {
            window.Kakao.init(KAKAO_JS_KEY);
          } catch (e) {
            console.error("Kakao init error:", e);
          }
        }
        return true;
      }
      return false;
    };

    if (!initKakao()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (initKakao() || attempts >= 10) {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('링크가 복사되었습니다.');
  };

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(KAKAO_JS_KEY);
      } catch (e) {
        alert("카카오 공유를 초기화할 수 없습니다.");
        return;
      }
    }

    try {
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
    } catch (e) {
      console.error("kakao share error", e);
    }
  };

  const handleXShare = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  const btnBaseClass = "flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95 active:translate-y-0.5 cursor-pointer";

  return (
    <div className="flex items-center gap-3 py-6 border-t border-b border-gray-100 my-8">
      <span className="text-sm font-bold text-gray-400 flex items-center gap-1.5 mr-2 uppercase tracking-wider">
        <Share2 className="w-4 h-4" /> Share
      </span>
      
      <button 
        onClick={handleCopyLink} 
        className={`${btnBaseClass} w-11 h-11 bg-gray-100 text-gray-600 hover:bg-gray-200`}
        title="Copy Link"
      >
        <LinkIcon className="w-[22px] h-[22px]" />
      </button>
      
      <button 
        onClick={handleKakaoShare}
        className={`${btnBaseClass} w-11 h-11 bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90`}
        title="Share on Kakao"
      >
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current">
          <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.707 4.8 4.34 6.054l-.81 2.976c-.05.178.05.346.21.346.07 0 .14-.02.2-.07l3.48-2.34c.51.05 1.04.08 1.58.08 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
        </svg>
      </button>
      
      <button 
        onClick={handleXShare}
        className={`${btnBaseClass} w-11 h-11 bg-black text-white hover:bg-black/80`}
        title="Share on X"
      >
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      
      <button 
        onClick={handleFacebookShare}
        className={`${btnBaseClass} w-11 h-11 bg-[#1877F2] text-white hover:bg-[#1877F2]/90`}
        title="Share on Facebook"
      >
        <Facebook className="w-[22px] h-[22px] fill-current scale-110" />
      </button>
    </div>
  );
}
