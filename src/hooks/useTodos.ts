import supabase from '@/client';
import { Todo } from '@/types/todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface TodoForm {
  title: string;
}

export const useQueryTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Todo[];
    },
  });
};

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TodoForm) => {
      const {
        data: { user },
        error: getUserError,
      } = await supabase.auth.getUser();
      if (getUserError) throw getUserError;

      const { error } = await supabase
        .from('todos')
        .insert([{ title: data.title, user_id: user?.id }]);
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}

export const useUpdateTodo = (todo: Todo) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTodo: Partial<Todo>) => {
      const { error } = await supabase
        .from('todos')
        .update(updatedTodo)
        .eq('id', todo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
};

export const useDeleteTodo = (todo: Todo) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('todos').delete().eq('id', todo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
};
