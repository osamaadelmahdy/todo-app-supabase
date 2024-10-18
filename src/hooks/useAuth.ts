import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '../client';

interface LoginForm {
  email: string;
  password: string;
}
export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginForm) => {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) throw error;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const { error } = await supabase.auth.signUp(data);
      if (error) throw new Error(error.message);
      return 'Sign-up successful. Please check your email.';
    },
  });
};

export const useLoginwithGithub = () => {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  });
};
