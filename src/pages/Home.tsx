import { Spinner } from '@/components/ui/Spinner';

import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  // const { data: session, isLoading, error } = useSession();
  const { user: session, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logoutMutation = useLogout();

  if (loading) {
    return <Spinner show />;
  }

  if (error) {
    return <p>Failed to load session: {error}</p>;
  }

  const handleSignOut = async () => {
    if (session) {
      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          navigate('/login');
        },
      });
      return;
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col items-start">
          <h4>Welcome,</h4>
          <h4> {session?.user?.email || 'Guest'}</h4>
        </div>
        <Button
          disabled={logoutMutation.isPending}
          size={'sm'}
          onClick={handleSignOut}
        >
          {session ? 'Sign Out' : 'Sign In'}
        </Button>
      </div>

      <div className="flex flex-col gap-4  ">
        {session ? <TodoForm /> : null}

        <TodoList />
      </div>
    </div>
  );
}

export default Home;
