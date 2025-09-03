import { useAuth } from '../state/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 p-3 backdrop-blur dark:bg-gray-900/80">
      <Link to="/" className="text-xl font-semibold">Promptify</Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user ? (
          <>
            <span className="text-sm opacity-80">{user.name} ({user.role})</span>
            <button onClick={logout} className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
          </>
        ) : (
          <Link to="/login" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Login</Link>
        )}
      </div>
    </header>
  );
}
