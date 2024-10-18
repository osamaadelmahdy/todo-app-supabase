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
import { useSignUp } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface RegisterForm {
  email: string;
  password: string;
}

function Register() {
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: err => {
        toast.error(err.message);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-md mx-auto mt-10">
          <CardHeader>
            <CardTitle>Register</CardTitle>
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
                {...register('password', {
                  required: 'Password is required',
                  minLength: 6,
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button variant={'link'} onClick={() => navigate('/login')}>
                {'Already have an account? Sign In'}
              </Button>
              <Button
                disabled={signUpMutation.isPending}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
              <LoginWithGithubBtn title="Register" />
            </div>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

export default Register;
