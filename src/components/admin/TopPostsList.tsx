interface Props {
  posts: any[];
}

export default function TopPostsList({ posts }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Top Posts by Views</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No data available</div>
        ) : (
          posts.map((post, i) => (
            <div key={post.slug} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                  {i + 1}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{post.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">/{post.slug}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{(post.views || 0).toLocaleString()}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Views</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
