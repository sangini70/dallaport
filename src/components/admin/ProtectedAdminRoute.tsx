import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// 실제 구현에서는 Firebase Auth 상태를 확인합니다.
// 현재는 UI 구현을 위해 임시로 통과시킵니다.
export default function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = true; // TODO: Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
