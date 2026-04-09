import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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
    
    const postToSave = {
      ...data,
      updatedAt: serverTimestamp(),
      views: data.views || 0,
      ctr: data.ctr || 0,
    };

    console.log('[SAVE] Attempting setDoc...');
    try {
      await setDoc(docRef, postToSave, { merge: true });
      console.log('[SAVE] setDoc SUCCESS');
    } catch (setDocError) {
      console.error('[SAVE] setDoc FAILED:', setDocError);
      throw setDocError;
    }

    console.log('[SAVE] Attempting /api/sync-json...');
    try {
      // After saving to Firestore, trigger JSON sync
      const response = await fetch('/api/sync-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postToSave),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[SAVE] /api/sync-json FAILED (Non-fatal): Status ${response.status}, Body: ${errorText}`);
        // 임시 조치: JSON 동기화가 실패해도 Firestore 저장이 성공했으므로 에러를 던지지 않음
      } else {
        console.log('[SAVE] /api/sync-json SUCCESS');
      }
    } catch (syncError) {
      console.warn(`[SAVE] /api/sync-json Network Error (Non-fatal):`, syncError);
    }
    
    return true;
  } catch (error) {
    console.log('[SAVE] Final error caught:', error);
    throw error;
  }
}
