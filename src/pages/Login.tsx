import LoginWithGithubBtn from '@/components/LoginWithGithubBtn';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/useAuth';
import { LoginForm } from '@/types/auth';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const loginMutation = useLogin();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        window.location.href = '/';
      },
      onError: err => {
        toast.error(err.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              {...register('email', { required: 'Email is required' })}
              type="text"
              placeholder="Username"
            />
            {errors.email && <span>{errors.email.message}</span>}
            <Input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button variant={'link'} onClick={() => navigate('/register')}>
              {'Don’t have an account? Sign Up'}
            </Button>
            <Button
              disabled={loginMutation.isPending}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
            <LoginWithGithubBtn title="Login" />
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Login;
