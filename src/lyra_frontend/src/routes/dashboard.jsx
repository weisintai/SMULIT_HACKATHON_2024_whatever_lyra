import { createFileRoute } from "@tanstack/react-router";
import { useQueryCall } from "@/lib/actor";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: () => <Dashboard />,
});

const Dashboard = () => {
  const [consentToDataCollection, setConsentToDataCollection] = useState(null);

  const { call, data, error } = useQueryCall({
    functionName: "getUserData",
    refetchOnMount: true,
    refetchInterval: 1000, // refetch every 5 seconds
    onSuccess: (data) => {
      if (data.length > 0) {
        setConsentToDataCollection(
          Number(data[0].consentToDataCollection.toString())
        );
      }
    },
  });

  return (
    <div>
      <div className="p-2">
        {consentToDataCollection === null ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              You {consentToDataCollection === 1 ? "" : "don't"} consent to data
              collection.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
