import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { deletePost } from '../../services/deletePost';

type IndexStatus = '미요청' | '요청완료' | '색인확인';
type PostStatus = 'published' | 'draft';

interface Post {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  googleStatus: IndexStatus;
  naverStatus: IndexStatus;
  views: number;
  language?: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          title: data.title || 'Untitled',
          slug: data.slug || doc.id,
          status: data.status || 'draft',
          googleStatus: data.googleStatus || '미요청',
          naverStatus: data.naverStatus || '미요청',
          views: data.views || 0,
          language: data.language || 'ko',
        });
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: PostStatus) => {
    try {
      await updateDoc(doc(db, 'posts', id), { status: newStatus });
      setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('상태 업데이트에 실패했습니다.');
    }
  };

  const handleGoogleStatusChange = async (id: string, newStatus: IndexStatus) => {
    try {
      await updateDoc(doc(db, 'posts', id), { googleStatus: newStatus });
      setPosts(posts.map(p => p.id === id ? { ...p, googleStatus: newStatus } : p));
    } catch (error) {
      console.error('Error updating Google status:', error);
    }
  };

  const handleNaverStatusChange = async (id: string, newStatus: IndexStatus) => {
    try {
      await updateDoc(doc(db, 'posts', id), { naverStatus: newStatus });
      setPosts(posts.map(p => p.id === id ? { ...p, naverStatus: newStatus } : p));
    } catch (error) {
      console.error('Error updating Naver status:', error);
    }
  };

  const handleDelete = async (post: Post) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      try {
        await deletePost(post.slug, post.language || 'ko');
        setPosts(posts.filter(p => p.id !== post.id));
        alert('삭제되었습니다.');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const renderIndexButtons = (id: string, currentStatus: IndexStatus, onChange: (id: string, status: IndexStatus) => void) => {
    return (
      <div className="flex gap-1">
        <button 
          onClick={() => onChange(id, '미요청')}
          className={`px-2 py-1 text-xs rounded border ${currentStatus === '미요청' ? 'bg-gray-200 border-gray-300 font-bold' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
        >
          미요청
        </button>
        <button 
          onClick={() => onChange(id, '요청완료')}
          className={`px-2 py-1 text-xs rounded border ${currentStatus === '요청완료' ? 'bg-blue-100 border-blue-200 text-blue-800 font-bold' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
        >
          요청완료
        </button>
        <button 
          onClick={() => onChange(id, '색인확인')}
          className={`px-2 py-1 text-xs rounded border ${currentStatus === '색인확인' ? 'bg-green-100 border-green-200 text-green-800 font-bold' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
        >
          색인확인
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>All Categories</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>Latest</option>
          </select>
          <Link to="/admin/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
            + New Post
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">TITLE</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium">GOOGLE</th>
              <th className="px-4 py-3 font-medium">NAVER</th>
              <th className="px-4 py-3 font-medium">VIEWS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  데이터 없음
                </td>
              </tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link to={`/admin/edit/${post.slug}`} className="block">
                      <div className="font-bold text-gray-900 hover:text-blue-600">{post.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">/{post.slug}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <select 
                      value={post.status}
                      onChange={(e) => handleStatusChange(post.id, e.target.value as PostStatus)}
                      className={`text-xs font-bold px-2 py-1 rounded border outline-none ${post.status === 'published' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    {renderIndexButtons(post.id, post.googleStatus, handleGoogleStatusChange)}
                  </td>
                  <td className="px-4 py-3">
                    {renderIndexButtons(post.id, post.naverStatus, handleNaverStatusChange)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-medium">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/edit/${post.slug}`} className="p-1.5 text-gray-400 hover:text-blue-600 rounded">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(post)} className="p-1.5 text-gray-400 hover:text-red-600 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        본 관리자 화면은 문서 관리 및 색인 상태 관리 목적이며, 자동 분석·자동 최적화 기능을 제공하지 않는다.
      </div>
    </div>
  );
}
