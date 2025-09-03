import { NavLink } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

const navClasses = ({ isActive }) =>
  `block rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}`;

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-64 shrink-0 border-r bg-white p-3 dark:bg-gray-900">
      <nav className="space-y-1">
        <NavLink to="/" className={navClasses}>Dashboard</NavLink>
        <NavLink to="/categories" className={navClasses}>Categories</NavLink>
        <NavLink to="/generate" className={navClasses}>Generate Prompt</NavLink>
        <NavLink to="/settings" className={navClasses}>Settings</NavLink>
        {user?.role === 'admin' && (
          <>
            <div className="mt-4 mb-1 text-xs uppercase opacity-60">Admin</div>
            <NavLink to="/admin/users" className={navClasses}>Users</NavLink>
            <NavLink to="/admin/prompts" className={navClasses}>All Prompts</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
