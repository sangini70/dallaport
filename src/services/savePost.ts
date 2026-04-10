import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';

export interface PostData {
  title: string;
  slug: string;
  language: string;
  category: string;
  status: string;
  contentHtml: string;
  seoTitle: string;
  seoDescription: string;
  shortDescription?: string;
  publishDate?: string;
  track?: string;
  views?: number;
  ctr?: number;
}

export async function savePost(data: PostData) {
  const collectionPath = `posts/${data.slug}`;
  console.log('[SAVE] projectId:', firebaseConfig.projectId);
  console.log('[SAVE] path:', collectionPath);
  console.log('[SAVE] payload:', data);

  try {
    const docRef = doc(db, 'posts', data.slug);
    const docSnap = await getDoc(docRef);
    
    const postToSave: any = {
      ...data,
      updatedAt: serverTimestamp(),
      views: data.views || 0,
      ctr: data.ctr || 0,
    };

    if (!docSnap.exists()) {
      postToSave.createdAt = serverTimestamp();
    }

    console.log('[SAVE] Attempting setDoc...');
    try {
      await setDoc(docRef, postToSave, { merge: true });
      console.log('[SAVE] setDoc SUCCESS');
    } catch (setDocError) {
      console.error('[SAVE] setDoc FAILED:', setDocError);
      throw setDocError;
    }
    
    return true;
  } catch (error) {
    console.log('[SAVE] Final error caught:', error);
    throw error;
  }
}
