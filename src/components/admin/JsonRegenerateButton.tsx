import { RefreshCw } from 'lucide-react';

export default function JsonRegenerateButton({ onRegenerate, isRegenerating }: { onRegenerate: () => void, isRegenerating?: boolean }) {
  return (
    <button 
      onClick={onRegenerate}
      disabled={isRegenerating}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
      정적 JSON 재생성
    </button>
  );
}
