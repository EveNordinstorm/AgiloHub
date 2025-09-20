"use client";

import { useEffect } from "react";
import { AgiloHubIcon } from "@/components/Logos/AgiloHubIcon";
import { FreeStar } from "@/components/TierStars/FreeStar";
import { ProStar } from "@/components/TierStars/ProStar";
import { EnterpriseStar } from "@/components/TierStars/EnterpriseStar";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { fetchProfile } from "common/redux/slices/authSlice";
import { ProjectContainer } from "@/components/Projects/projectsContainer";
import { TasksContainer } from "@/components/Tasks/tasksContainer";

const starMap: Record<string, React.ReactNode> = {
  Free: <FreeStar className="fill-yellow h-8 md:h-10" />,
  Pro: <ProStar className="fill-yellow h-8 md:h-10" />,
  Enterprise: <EnterpriseStar className="fill-yellow h-8 md:h-10" />,
};

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const { user, loading, error, accessToken } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user && accessToken) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user, accessToken]);

  if (loading) return <p className="text-red-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) {
    return (
      <div className="bg-dark-blue flex justify-center items-center text-center min-h-screen">
        <p className="text-white text-lg md:text-xl">
          Please <span className="font-bold">log in</span> or{" "}
          <span className="font-bold">sign up</span> to view your account
          details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-dark-blue">
      <div className="flex justify-center">
        <section>
          <div className="pt-10 flex gap-5">
            <AgiloHubIcon className="text-white h-24 md:h-32" />
            <div className="text-white mt-2 md:mt-12">
              <p className="md:text-xl mb-1">Welcome to your account</p>
              <div className="md:flex gap-2">
                <p className="font-bold text-xl md:text-3xl">
                  {user.firstName}
                </p>
                <p className="font-bold text-xl md:text-3xl">{user.lastName}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <div className="flex gap-2 items-center">
              {starMap[user.subscriptionTier?.tier ?? "Free"]}
              <p className="text-white font-semibold md:text-lg">
                {user.subscriptionTier?.tier ?? "Free"} plan
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div>
              <p className="text-white mb-2 text-center md:text-lg">
                for full gamified features:
              </p>
              <div className="flex justify-center">
                <button className="bg-primary-blue hover:bg-yellow text-white hover:text-black transition-colors duration-150 ease-in hover:cursor-pointer font-bold text-base lg:text-lg rounded px-4 py-1.5">
                  Download the App
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="py-8 space-y-4 md:space-y-8">
        <ProjectContainer />
        <TasksContainer />
      </section>
    </div>
  );
}
