import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import { fetchProjects } from "common/src/redux/slices/projectSlice";
import { ProjectCard } from "./projectCard";

export function ProjectContainer() {
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (!projects.length && !loading) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  if (loading) return <p className="text-white">Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-5 md:px-10">
      <div className="bg-black p-6 md:p-8">
        <h2 className="text-white font-bold text-xl md:text-2xl mb-4">
          My Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}
