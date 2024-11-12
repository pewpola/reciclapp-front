import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}
