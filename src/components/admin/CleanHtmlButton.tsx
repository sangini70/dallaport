import { Wand2 } from 'lucide-react';

interface CleanHtmlButtonProps {
  content: string;
  onClean: (cleaned: string) => void;
}

export default function CleanHtmlButton({ content, onClean }: CleanHtmlButtonProps) {
  const handleClean = () => {
    // 실제 구현에서는 DOMPurify 등을 사용하여 불필요한 태그, 인라인 스타일 등을 제거
    // 여기서는 간단히 빈 줄 정리 예시
    const cleaned = content.replace(/\n\s*\n/g, '\n\n').trim();
    onClean(cleaned);
    alert('HTML/Markdown 정리가 완료되었습니다.');
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
