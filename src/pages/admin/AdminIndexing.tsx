import { useState } from 'react';
import { Database, CheckCircle2, Search } from 'lucide-react';
import JsonRegenerateButton from '../../components/admin/JsonRegenerateButton';

export default function AdminIndexing() {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleSync = () => {
    setIsRegenerating(true);
    // 실제 구현: Firestore 데이터를 읽어 JSON 파일로 생성하는 서버리스 함수 호출
    setTimeout(() => {
      alert('정적 JSON 재생성이 완료되었습니다.');
      setIsRegenerating(false);
    }, 1500);
  };

  const handleIndexRequest = (platform: 'Google' | 'Naver') => {
    alert(`${platform} 색인 요청이 전송되었습니다. (상태가 'requested'로 변경됨)`);
  };

  const handleIndexCheck = () => {
    alert(`색인 상태 확인이 완료되었습니다.`);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">색인 및 동기화</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">정적 JSON 재생성 (배포)</h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Firestore에 저장된 최신 콘텐츠 데이터를 읽어 사용자 페이지에서 사용할 정적 JSON 파일로 생성합니다.
                글을 작성하거나 수정한 후 반드시 이 버튼을 눌러야 사용자 사이트에 반영됩니다.
              </p>
              <JsonRegenerateButton onRegenerate={handleSync} isRegenerating={isRegenerating} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">검색엔진 색인 관리</h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                새로 발행된 콘텐츠를 구글과 네이버 검색엔진에 수동으로 색인 요청합니다.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <button onClick={() => handleIndexRequest('Google')} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    구글 색인요청
                  </button>
                  <button onClick={() => handleIndexRequest('Naver')} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                    네이버 색인요청
                  </button>
                </div>
                <button onClick={handleIndexCheck} className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors">
                  전체 색인상태 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">최근 동기화 기록</h3>
        <ul className="space-y-3">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>성공적으로 JSON 파일이 생성되었습니다.</span>
              </div>
              <span className="text-gray-400">2026-04-0{8-i} 14:30</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
