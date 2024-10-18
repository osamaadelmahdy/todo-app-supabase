import { Spinner } from '@/components/ui/Spinner';
import { useSession } from '@/hooks/useAuth';

import { Navigate } from 'react-router-dom';

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading, error } = useSession();

  if (isLoading) {
    return <Spinner show />;
  }

  if (error) {
    return (
      <p className="text-red-600">Failed to load session: {error.message}</p>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthRoute;
