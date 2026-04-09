import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import FlowMap from './pages/FlowMap';
import FlowStep from './pages/FlowStep';
import Search from './pages/Search';
import EnHome from './pages/EnHome';
import EnFlowMap from './pages/EnFlowMap';
import EnFlowStep from './pages/EnFlowStep';
import EnSearch from './pages/EnSearch';
import AdminHome from './pages/admin/AdminHome';
import AdminPosts from './pages/admin/AdminPosts';
import AdminNewPost from './pages/admin/AdminNewPost';
import AdminEditPost from './pages/admin/AdminEditPost';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminIndexing from './pages/admin/AdminIndexing';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'flow-map', element: <FlowMap /> },
      { path: 'search', element: <Search /> },
      { path: 'post/:slug', element: <FlowStep /> },
      { path: 'en', element: <EnHome /> },
      { path: 'en/flow-map', element: <EnFlowMap /> },
      { path: 'en/search', element: <EnSearch /> },
      { path: 'en/post/:slug', element: <EnFlowStep /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: 'posts', element: <AdminPosts /> },
      { path: 'new', element: <AdminNewPost /> },
      { path: 'edit/:slug', element: <AdminEditPost /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'indexing', element: <AdminIndexing /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
]);
