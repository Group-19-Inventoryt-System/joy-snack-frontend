import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';

const RedirectIfAuthenticated = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/profile'} replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
