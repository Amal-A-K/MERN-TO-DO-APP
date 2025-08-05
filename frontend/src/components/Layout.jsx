import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  // Conditionally apply centering classes only for auth pages
  const mainClass = isAuthPage
    ? 'flex-grow p-4 flex items-center justify-center'
    : 'flex-grow p-4';

  return (
    <div className="min-h-screen flex flex-col bg-violet-100">
      <Navbar />
      <main className={mainClass}>
        <Outlet />
      </main>
      <footer className="bg-gray-200 p-4 text-center text-gray-600">
        © {new Date().getFullYear()} Todo App
      </footer>
    </div>
  );
};

export default Layout;