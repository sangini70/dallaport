import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function deletePost(slug: string, language: string) {
  try {
    const docRef = doc(db, 'posts', slug);
    await deleteDoc(docRef);

    // After deleting from Firestore, trigger JSON removal
    const response = await fetch('/api/remove-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, language }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove JSON');
    }

    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
