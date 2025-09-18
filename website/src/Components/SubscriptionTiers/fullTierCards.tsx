"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { fetchSubscriptionTiers } from "common/redux/slices/subscriptionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function FullTierCards() {
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
    <div className="grid gap-10 md:grid-cols-3 py-16 px-8 md:px-16">
      {tiers.map((tier) => (
        <div key={tier.id} className="bg-white px-10 pb-5 pt-10 rounded-t-full">
          <h2 className="text-xl md:text-3xl text-primary-blue font-bold text-center mb-2">
            {tier.tier}
          </h2>
          <p className="text-center md:text-lg font-semibold text-primary-blue">
            {tier.strapline}
          </p>
          <ul className="mt-2 lg:px-10 font-semibold text-primary-blue">
            {tier.features.map((f, i) => (
              <li key={i}>
                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />{" "}
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-2">{tier.description}</p>
          <button className="mt-4 px-4 py-2 w-full rounded-full bg-blue-600 text-white font-bold">
            {tier.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}
