// Firestore 데이터를 읽어 JSON 파일로 생성하는 로직 (Node.js 환경 또는 서버리스용)
export async function syncFirestoreToJson() {
  console.log('Syncing Firestore data to static JSON files...');
  // 1. Firestore에서 전체 게시글 목록 로드
  // 2. flow-index.json 생성
  // 3. 각 게시글별 flow-detail-[slug].json 생성
  return true;
}
