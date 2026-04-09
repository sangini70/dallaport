export default function IndexStatusBadge({ status, platform }: { status: string, platform: 'Google' | 'Naver' }) {
  let color = 'bg-gray-100 text-gray-800';
  let text = '미요청';

  if (status === 'requested') {
    color = 'bg-yellow-100 text-yellow-800';
    text = '요청완료';
  } else if (status === 'indexed') {
    color = 'bg-green-100 text-green-800';
    text = '색인완료';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`} title={`${platform} 색인 상태`}>
      {platform[0]}: {text}
    </span>
  );
}
