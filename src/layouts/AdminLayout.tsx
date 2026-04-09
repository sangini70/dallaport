import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/posts', label: 'Posts' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shrink-0 justify-between">
        <div className="flex items-center gap-8">
          <Link to="/admin" className="text-lg font-bold text-gray-900">
            Admin Panel
          </Link>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/" target="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              View Site
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
