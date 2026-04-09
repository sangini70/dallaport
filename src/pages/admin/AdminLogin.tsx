import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    console.log('[AdminLogin] popup 시작');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('[AdminLogin] popup 성공', result.user.email);
      
      if (result.user && result.user.email === 'luganopizza@gmail.com') {
        setStep(2);
        setError('');
      } else {
        setError('허용되지 않은 관리자 이메일입니다.');
        auth.signOut();
      }
    } catch (err: any) {
      console.error('[AdminLogin] popup 에러:', err.code, err.message);
      setError(`구글 로그인에 실패했습니다: ${err.message || '알 수 없는 오류'}`);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'settings', 'security');
      const docSnap = await getDoc(docRef);
      
      let validPassword = 'admin123'; // Fallback for initial setup if doc doesn't exist
      if (docSnap.exists() && docSnap.data().adminPassword) {
        validPassword = docSnap.data().adminPassword;
      }

      if (password === validPassword) {
        console.log('[AdminLogin] sessionStorage 저장');
        sessionStorage.setItem('admin_authenticated', 'true');
        console.log('[AdminLogin] redirect 실행');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      console.error('Error checking password:', err);
      setError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          관리자 로그인
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div>
              <p className="text-sm text-gray-600 mb-6 text-center">
                1단계: 허용된 구글 계정으로 로그인해주세요.
              </p>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Google 계정으로 로그인
              </button>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                2단계: 관리자 비밀번호를 입력해주세요.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  로그인 완료
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
