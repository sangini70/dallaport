export default function AdSlot({ position }: { position: 'top' | 'middle' | 'bottom' }) {
  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 my-8 flex items-center justify-center text-gray-400 text-sm min-h-[120px] shadow-inner">
      [광고 영역 - {position}]
    </div>
  );
}
