import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authState = sessionStorage.getItem('admin_authenticated') === 'true';
    console.log('[ProtectedAdminRoute] sessionStorage 읽기 완료:', authState);
    setIsAuthenticated(authState);
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('[ProtectedAdminRoute] 미인증 상태, 로그인 페이지로 리다이렉트');
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
