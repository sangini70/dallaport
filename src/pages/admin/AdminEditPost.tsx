import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostEditor from '../../components/admin/PostEditor';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { savePost } from '../../services/savePost';

export default function AdminEditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const docRef = doc(db, 'posts', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPostData({
            title: data.title || '',
            slug: data.slug || slug,
            language: data.language || 'ko',
            category: data.category || 'exchange-rate',
            status: data.status || 'draft',
            content: data.contentHtml || '',
            seoTitle: data.seoTitle || '',
            seoDescription: data.seoDescription || '',
            tags: data.tags || '',
          });
        } else {
          alert('Post not found');
          navigate('/admin/posts');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug, navigate]);

  const handleSave = async (data: any) => {
    try {
      await savePost({
        title: data.title,
        slug: data.slug,
        language: data.language,
        category: data.category,
        status: data.status,
        contentHtml: data.content,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        track: data.category,
      });
      alert('수정되었습니다.');
      navigate('/admin/posts');
    } catch (error) {
      console.error('Save error:', error);
      alert('저장에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
      </div>
      <PostEditor initialData={postData} onSave={handleSave} />
      <div className="mt-8 text-center text-xs text-gray-400">
        본 작성 화면은 HTML 문서 입력 및 저장 목적이며, 자동 생성·자동 분석·자동 최적화 기능을 제공하지 않는다.
      </div>
    </div>
  );
}
