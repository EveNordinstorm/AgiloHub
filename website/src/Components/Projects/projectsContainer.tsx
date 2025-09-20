import { ProjectCard } from "./projectCard";

export function ProjectContainer() {
  return (
    <div className="px-5 md:px-10">
      <div className="bg-black p-6 md:p-8">
        <h2 className="text-white font-bold text-xl md:text-2xl mb-4">
          My Projects
        </h2>
        <ProjectCard />
      </div>
    </div>
  );
}
