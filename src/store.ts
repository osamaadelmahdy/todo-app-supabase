import { create } from 'zustand';
import supabase from './client';

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
  fetchUser: () => void;
}

const useUserStore = create<UserState>(set => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      set({ user: data.session, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useUserStore;
