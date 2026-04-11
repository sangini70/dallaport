import { Youtube, ExternalLink } from 'lucide-react';

interface Props {
  language?: 'ko' | 'en';
}

export default function YoutubeAwareness({ language = 'ko' }: Props) {
  const isEn = language === 'en';
  
  const buttonText = isEn ? "Watch on YouTube" : "유튜브 보러가기";
  const channelUrl = "https://www.youtube.com/channel/UCKMVZW0POW1ATLEkxZYVnzQ";

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-3 md:p-4 flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <img src="/thumbnails/icons8-youtube.svg" alt="YouTube" className="w-6 h-6" />
          </div>
          <h3 className="text-gray-900 font-black text-base md:text-lg tracking-tight">
            DALLAPORT YouTube
          </h3>
        </div>
        
        <a 
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#FF0000] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#CC0000] transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
        >
          {buttonText}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
