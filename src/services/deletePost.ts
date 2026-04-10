import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function deletePost(slug: string, language: string) {
  try {
    const docRef = doc(db, 'posts', slug);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
