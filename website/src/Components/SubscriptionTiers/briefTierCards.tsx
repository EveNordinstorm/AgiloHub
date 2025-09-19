"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { fetchSubscriptionTiers } from "common/redux/slices/subscriptionSlice";
import { FreeStar } from "../TierStars/FreeStar";
import { ProStar } from "../TierStars/ProStar";
import { EnterpriseStar } from "../TierStars/EnterpriseStar";

const starMap: Record<string, React.ReactNode> = {
  Free: <FreeStar className="fill-yellow h-20" />,
  Pro: <ProStar className="fill-yellow h-20" />,
  Enterprise: <EnterpriseStar className="fill-yellow h-20" />,
};

export default function BriefTierCards() {
  const dispatch = useAppDispatch();
  const { tiers, loading, error } = useAppSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    dispatch(fetchSubscriptionTiers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid gap-6 xl:gap-14 md:grid-cols-3 py-16 px-10 md:px-16">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className="bg-white px-6 pb-6 pt-10 rounded-t-full flex flex-col"
        >
          <h2 className="text-2xl md:text-3xl text-primary-blue font-bold text-center mb-2">
            {tier.tier}
          </h2>
          <div className="flex justify-center my-3">
            {starMap[tier.tier] ?? null}
          </div>

          <ul className="mt-2 flex-col justify-items-center font-semibold text-white">
            {tier.features.map((f, i) => (
              <div
                key={i}
                className="bg-dark-blue rounded-full py-1 px-4 mb-1.5 text-center"
              >
                <li>{f}</li>
              </div>
            ))}
          </ul>
          <div className="flex-grow" />
          <button className="mt-4 px-4 py-2 w-full rounded-full bg-primary-blue hover:bg-dark-blue hover:cursor-pointer transition-colors ease-in text-white font-bold">
            {tier.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}
