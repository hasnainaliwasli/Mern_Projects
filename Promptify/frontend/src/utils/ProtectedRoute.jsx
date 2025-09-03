import { Navigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
}
