export default function SeoScore({ title, summary, keyword }: { title: string, summary: string, keyword: string }) {
  let score = 0;
  if (title && title.trim().length > 0) score += 30;
  if (summary && summary.trim().length > 0) score += 40;
  if (keyword && keyword.trim().length > 0 && (title.includes(keyword) || summary.includes(keyword))) score += 30;

  let color = 'text-red-500';
  if (score >= 70) color = 'text-green-500';
  else if (score >= 40) color = 'text-yellow-500';

  return (
    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
      <span className="text-xs font-bold text-gray-500">SEO Score:</span>
      <span className={`text-sm font-bold ${color}`}>{score} / 100</span>
    </div>
  );
}
