import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface PostData {
  title: string;
  slug: string;
  language: string;
  category: string;
  status: string;
  contentHtml: string;
  seoTitle: string;
  seoDescription: string;
  track?: string;
  views?: number;
  ctr?: number;
}

export async function savePost(data: PostData) {
  try {
    const docRef = doc(db, 'posts', data.slug);
    
    const postToSave = {
      ...data,
      updatedAt: serverTimestamp(),
      views: data.views || 0,
      ctr: data.ctr || 0,
    };

    await setDoc(docRef, postToSave, { merge: true });

    // After saving to Firestore, trigger JSON sync
    const response = await fetch('/api/sync-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postToSave),
    });

    if (!response.ok) {
      throw new Error('Failed to sync JSON');
    }

    return true;
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
}
