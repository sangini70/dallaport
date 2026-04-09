import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
