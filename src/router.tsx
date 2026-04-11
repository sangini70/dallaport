import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import FlowMap from './pages/FlowMap';
import FlowStep from './pages/FlowStep';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import CategoryPage from './pages/CategoryPage';
import EnHome from './pages/EnHome';
import EnFlowMap from './pages/EnFlowMap';
import EnFlowStep from './pages/EnFlowStep';
import EnSearch from './pages/EnSearch';
import EnCategoryPage from './pages/EnCategoryPage';
import EnPrivacy from './pages/EnPrivacy';
import EnContact from './pages/EnContact';
import AdminHome from './pages/admin/AdminHome';
import AdminPosts from './pages/admin/AdminPosts';
import AdminNewPost from './pages/admin/AdminNewPost';
import AdminEditPost from './pages/admin/AdminEditPost';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminIndexing from './pages/admin/AdminIndexing';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

const PostRedirect = ({ lang = 'ko' }: { lang?: string }) => {
  const { slug } = useParams();
  return <Navigate to={lang === 'en' ? `/en/${slug}` : `/${slug}`} replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'flow-map', element: <FlowMap /> },
      { path: 'search', element: <Search /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'category/:categoryId', element: <CategoryPage /> },
      { path: 'post/:slug', element: <PostRedirect /> },
      { path: 'en', element: <EnHome /> },
      { path: 'en/flow-map', element: <EnFlowMap /> },
      { path: 'en/search', element: <EnSearch /> },
      { path: 'en/contact', element: <EnContact /> },
      { path: 'en/privacy', element: <EnPrivacy /> },
      { path: 'en/category/:categoryId', element: <EnCategoryPage /> },
      { path: 'en/post/:slug', element: <PostRedirect lang="en" /> },
      { path: 'en/:slug', element: <EnFlowStep /> },
      { path: ':slug', element: <FlowStep /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
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
