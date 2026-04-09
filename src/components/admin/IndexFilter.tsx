export default function IndexFilter({ currentFilter, onChange }: { currentFilter: string, onChange: (val: string) => void }) {
  return (
    <select 
      value={currentFilter} 
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="all">전체 색인 상태</option>
      <option value="none">구글 미요청</option>
      <option value="requested">구글 요청완료</option>
      <option value="indexed">구글 색인완료</option>
    </select>
  );
}
