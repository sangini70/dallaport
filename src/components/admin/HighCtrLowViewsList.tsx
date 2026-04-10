interface Props {
  posts: any[];
}

export default function HighCtrLowViewsList({ posts }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">CTR 높고 조회수 낮은 글 TOP 5</h3>
        <p className="text-xs text-gray-500 mt-1">평균 CTR 이상 & 평균 조회수 미만. 노출 위치 개선이 필요할 수 있습니다.</p>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">조건에 맞는 데이터가 없습니다.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Title</th>
                <th className="px-4 py-2 font-medium text-right">CTR</th>
                <th className="px-4 py-2 font-medium text-right">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    {post.ctr ? post.ctr.toFixed(2) + '%' : '0.00%'}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    {(post.views || 0).toLocaleString()}
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
