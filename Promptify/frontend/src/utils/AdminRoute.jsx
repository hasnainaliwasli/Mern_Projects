import { Navigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export default function AdminRoute({ children }) {
  const { isAuthed, user } = useAuth();
  if (!isAuthed) return <Navigate to="/login" replace />;
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
}
