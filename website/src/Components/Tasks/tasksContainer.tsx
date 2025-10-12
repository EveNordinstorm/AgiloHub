import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import { fetchTasks } from "common/src/redux/slices/taskSlice";
import { TaskCard } from "./taskCard";

export function TasksContainer() {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (!tasks.length && !loading) {
      dispatch(fetchTasks());
    }
  }, [dispatch, loading, tasks]);

  if (loading) return <p className="text-white">Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-5 md:px-10">
      <div className="bg-black p-6 md:p-8">
        <h2 className="text-white font-bold text-xl md:text-2xl mb-4">
          My Tasks
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
