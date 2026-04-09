// 관리자 영역에서만 사용되는 Firestore 서비스
// 사용자 번들에는 포함되지 않아야 함

export async function getPosts() {
  console.log('Fetching posts from Firestore...');
  return [];
}

export async function savePost(data: any) {
  console.log('Saving post to Firestore...', data);
  return true;
}
