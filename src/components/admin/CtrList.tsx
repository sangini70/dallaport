interface Props {
  posts: any[];
}

export default function CtrList({ posts }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Posts to Improve (Low CTR)</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">데이터 없음</div>
        ) : (
          posts.map((post) => (
            <div key={post.slug} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-bold text-gray-900">{post.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">/{post.slug}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-600">{post.ctr ? post.ctr.toFixed(1) + '%' : '0%'}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">CTR</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
