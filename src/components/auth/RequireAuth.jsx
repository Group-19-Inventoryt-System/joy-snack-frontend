import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

const LoadingScreen = () => (
  <div className="flex min-h-[50vh] items-center justify-center px-4">
    <div className="rounded-2xl border border-orange-100 bg-white px-6 py-5 text-center shadow-sm">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      <p className="text-sm font-medium text-slate-700">Checking your session...</p>
    </div>
  </div>
);

const RequireAuth = ({ adminOnly = false }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/profile" replace state={{ deniedFrom: location.pathname }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
