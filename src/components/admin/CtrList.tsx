interface Props {
  posts: any[];
}

export default function CtrList({ posts }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">CTR 낮은 글 TOP 5</h3>
        <p className="text-xs text-gray-500 mt-1">노출수 10회 이상 기준. 썸네일이나 제목 개선이 필요할 수 있습니다.</p>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">데이터 없음</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Title</th>
                <th className="px-4 py-2 font-medium text-right">CTR</th>
                <th className="px-4 py-2 font-medium text-right">Imp.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">
                    {post.ctr ? post.ctr.toFixed(2) + '%' : '0.00%'}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-500">
                    {(post.impressions || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
