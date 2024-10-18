import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCreateTodo } from '@/hooks/useTodos';

interface TodoForm {
  title: string;
}

export const TodoForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoForm>();

  const createTodoMutation = useCreateTodo();

  const onSubmit = (data: TodoForm) => {
    createTodoMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };
  //   87be92933f03dce2554a4b5d4d086321de18b44a
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 ">
        <div className="w-full">
          <Input
            {...register('title', { required: 'Title is required' })}
            placeholder="New todo"
          />
          {errors?.title && <span>{errors?.title?.message}</span>}
        </div>

        <Button type="submit" disabled={createTodoMutation?.isPending}>
          {createTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </div>
    </form>
  );
};
