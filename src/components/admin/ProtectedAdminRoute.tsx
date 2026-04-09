import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
