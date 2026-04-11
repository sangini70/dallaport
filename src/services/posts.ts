import { collection, getDocs, query, where, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Post {
  id: string;
  slug: string;
  title: string;
  seoDescription: string;
  shortDescription: string;
  contentHtml: string;
  category: string;
  language: string;
  status: string;
  publishDate: string;
  createdAt?: any;
  updatedAt?: any;
  views: number;
  thumbnail?: string;
  tags?: string;
  flowStep?: string;
  hubSlug?: string;
}

export async function getPublishedPosts(lang: string = 'ko'): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('status', '==', 'published'),
      where('language', '==', lang)
    );
    
    const snapshot = await getDocs(q);
    const posts: Post[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({ id: doc.id, ...data } as Post);
    });

    // Sort by publishDate desc, then createdAt desc
    posts.sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate).getTime() : (a.createdAt?.toMillis?.() || 0);
      const dateB = b.publishDate ? new Date(b.publishDate).getTime() : (b.createdAt?.toMillis?.() || 0);
      return dateB - dateA;
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const docRef = doc(db, 'posts', slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Post;
    }
    return null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}
