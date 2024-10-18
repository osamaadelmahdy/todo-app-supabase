import { Button } from './ui/button';
import { useLoginwithGithub } from '@/hooks/useAuth';
import { GithubIcon } from 'lucide-react';

function LoginWithGithubBtn({ title }: { title: string }) {
  const loginWithGithubMutation = useLoginwithGithub();
  return (
    <div className="flex justify-center">
      <Button
        type="button"
        variant={'link'}
        onClick={() => loginWithGithubMutation.mutate()}
        disabled={loginWithGithubMutation.isPending}
      >
        <GithubIcon />
        {title} with Github
      </Button>
    </div>
  );
}

export default LoginWithGithubBtn;
