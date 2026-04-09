import { Wand2 } from 'lucide-react';

interface CleanHtmlButtonProps {
  content: string;
  onClean: (cleaned: string) => void;
}

export default function CleanHtmlButton({ content, onClean }: CleanHtmlButtonProps) {
  const handleClean = () => {
    let cleaned = content
      .replace(/\[cite:.*?\]/g, '') // Remove [cite: ...]
      .replace(/```html/g, '') // Remove markdown code wrappers
      .replace(/```/g, '')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // 효능, 치료, 개선, 질병 단정 표현이 들어가면 안전 표현으로 자동 치환
    cleaned = cleaned
      .replace(/치료/g, '관리')
      .replace(/완치/g, '도움')
      .replace(/개선/g, '유지')
      .replace(/효능/g, '특성');

    onClean(cleaned);
    alert('HTML/Markdown 정리 및 금칙어 치환이 완료되었습니다.');
  };

  return (
    <button 
      type="button" 
      onClick={handleClean}
      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
    >
      <Wand2 className="w-3 h-3" />
      Clean HTML
    </button>
  );
}
