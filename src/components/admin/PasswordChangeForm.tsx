import { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PasswordChangeForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg({ text: '', type: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      setStatusMsg({ text: '새 비밀번호가 일치하지 않습니다.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      const docRef = doc(db, 'settings', 'security');
      const docSnap = await getDoc(docRef);
      
      let validPassword = 'admin123';
      if (docSnap.exists() && docSnap.data().adminPassword) {
        validPassword = docSnap.data().adminPassword;
      }

      if (formData.currentPassword !== validPassword) {
        setStatusMsg({ text: '현재 비밀번호가 일치하지 않습니다.', type: 'error' });
        setIsSubmitting(false);
        return;
      }

      await setDoc(docRef, { adminPassword: formData.newPassword }, { merge: true });
      setStatusMsg({ text: '비밀번호가 변경되었습니다.', type: 'success' });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error('Error updating password:', err);
      setStatusMsg({ text: '비밀번호 변경에 실패했습니다.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-6">비밀번호 변경</h2>
      
      {statusMsg.text && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${statusMsg.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
          <input 
            type="password" 
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
          <input 
            type="password" 
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '변경 중...' : '비밀번호 변경'}
          </button>
        </div>
      </form>
    </div>
  );
}
