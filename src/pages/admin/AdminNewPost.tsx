import PostEditor from '../../components/admin/PostEditor';
import { useNavigate } from 'react-router-dom';
import { savePost } from '../../services/savePost';

export default function AdminNewPost() {
  const navigate = useNavigate();

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
        shortDescription: data.shortDescription,
        publishDate: data.publishDate,
        track: data.category,
        hubSlug: data.hubSlug,
        flowStep: data.flowStep,
        thumbnail: data.thumbnail,
      });
      alert('저장되었습니다.');
      navigate('/admin/posts');
    } catch (error) {
      console.error('Save error:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">새 글 작성</h1>
      </div>
      <PostEditor onSave={handleSave} />
      <div className="mt-8 text-center text-xs text-gray-400">
        본 작성 화면은 HTML 문서 입력 및 저장 목적이며, 자동 생성·자동 분석·자동 최적화 기능을 제공하지 않는다.
      </div>
    </div>
  );
}
