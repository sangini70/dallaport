// 사용자 영역에서 JSON 데이터를 가져오는 서비스 (훅 내부 로직과 유사)
export async function fetchFlowIndex(lang: 'ko' | 'en' = 'ko') {
  const res = await fetch(`/data/${lang}/flow-index.json`);
  if (!res.ok) throw new Error('Failed to fetch index');
  return res.json();
}

export async function fetchSearchIndex(lang: 'ko' | 'en' = 'ko') {
  const res = await fetch(`/data/${lang}/search-index.json`);
  if (!res.ok) throw new Error('Failed to fetch search index');
  return res.json();
}

export async function fetchFlowDetail(slug: string, lang: 'ko' | 'en' = 'ko') {
  const res = await fetch(`/data/${lang}/detail/${slug}.json`);
  if (!res.ok) throw new Error('Failed to fetch detail');
  return res.json();
}
