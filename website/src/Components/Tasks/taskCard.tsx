import { Clock } from "lucide-react";

export function TaskCard() {
  return (
    <div className="bg-dark-purple text-white md:w-[500px] p-5">
      <p className="font-bold text-lg mb-2">Build nav bar component</p>
      <p>Use Shadcn menu component, then style with Tailwind to...</p>
      <div className="flex justify-end items-center gap-2">
        <p className="text-lg font-bold">2d</p>
        <Clock name="chevron-right" color="white" size={20} />
      </div>
    </div>
  );
}
