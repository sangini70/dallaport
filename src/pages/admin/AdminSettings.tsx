import PasswordChangeForm from '../../components/admin/PasswordChangeForm';

export default function AdminSettings() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-sm text-gray-500">관리자 계정 및 보안 설정을 관리합니다.</p>
      </div>
      
      <div className="mb-8 border-b border-gray-100"></div>

      <PasswordChangeForm />

      <div className="mt-12 text-center text-xs text-gray-400">
        본 Settings 화면은 최소한의 계정 관리 목적이며, 시스템 설정·분석 설정·외부 연동 설정 기능을 제공하지 않는다.
      </div>
    </div>
  );
}
