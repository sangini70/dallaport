// 이 파일은 관리자 환경(Node.js 또는 서버리스)에서 Firestore 데이터를 읽어 
// 정적 JSON 파일로 변환하는 역할을 담당합니다.
// 사용자 번들에는 포함되지 않습니다.

export async function generateStaticJson() {
  console.log('Generating static JSON files for ko and en...');
  
  // 1. Fetch all published posts from Firestore
  // 2. Group by language (ko, en)
  // 3. Generate /public/data/ko/flow-index.json
  // 4. Generate /public/data/ko/search-index.json
  // 5. Generate /public/data/ko/sitemap-index.json
  // 6. Generate /public/data/ko/detail/flow-detail-[slug].json
  // 7. Repeat for 'en'
  
  return { success: true, timestamp: new Date().toISOString() };
}
