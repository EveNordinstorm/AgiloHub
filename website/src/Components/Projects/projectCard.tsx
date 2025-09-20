import { ChevronRight } from "lucide-react";

export function ProjectCard() {
  return (
    <div className="bg-dark-purple md:w-[500px] p-3">
      <div className="bg-primary-blue p-3 md:p-5">
        <p className="text-white font-bold text-lg md:text-2xl mb-2">
          SaaS Website
        </p>
        <div className="bg-yellow py-1 px-3 inline-block">
          <p className="font-bold text-black md:text-lg">LEAN</p>
        </div>
      </div>
      <div className="px-2 mt-4">
        <div className="flex-row flex-wrap">
          <div className="mr-2 mb-2">
            <p className="text-white md:text-lg font-semibold bg-dark-blue rounded-full px-4 py-1 inline-block">
              React
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <ChevronRight name="chevron-right" color="white" size={24} />
      </div>
    </div>
  );
}
