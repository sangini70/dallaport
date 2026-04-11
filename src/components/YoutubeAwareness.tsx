import { Youtube, ExternalLink } from 'lucide-react';

interface Props {
  language?: 'ko' | 'en';
}

export default function YoutubeAwareness({ language = 'ko' }: Props) {
  const isEn = language === 'en';
  
  const text = isEn 
    ? "Watch exchange rate trends on video" 
    : "환율 흐름, 영상으로도 보실 수 있습니다";
    
  const buttonText = isEn ? "Watch on YouTube" : "유튜브 보러가기";
  const channelUrl = "https://www.youtube.com/channel/UCKMVZW0POW1ATLEkxZYVnzQ";

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <Youtube className="w-7 h-7 fill-current" />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-base md:text-lg leading-tight">
              {text}
            </p>
            <p className="text-gray-400 text-[10px] md:text-xs mt-1 font-medium uppercase tracking-wider">
              Dallaport Official YouTube Channel
            </p>
          </div>
        </div>
        
        <a 
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#FF0000] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#CC0000] transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
        >
          {buttonText}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
