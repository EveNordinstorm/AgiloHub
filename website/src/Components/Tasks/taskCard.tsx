import { Task } from "common/types/interfaces/task";
import { Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-dark-purple text-white md:w-[500px] p-5">
      <div className="flex justify-between">
        <p className="font-bold text-lg mb-2">{task.title}</p>
        <div className="flex items-center px-4 py-1 rounded-full bg-primary-blue my-3">
          <FontAwesomeIcon
            icon={faStar}
            className="text-lg md:text-xl text-yellow"
          />
          <div className="text-yellow font-bold text-lg ml-2">
            {task.points}
          </div>
        </div>
      </div>

      <p>{task.description}</p>
      <div className="flex justify-end items-center gap-2">
        <p className="font-bold">
          {new Date(task.deadline).toLocaleString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <Clock name="chevron-right" color="white" size={20} />
      </div>
    </div>
  );
}
