import { createFileRoute } from "@tanstack/react-router";
import { useQueryCall } from "@/lib/actor";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/actor";

import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/columns";

export const Route = createFileRoute("/dashboard")({
  component: () => <Dashboard />,
});

const Dashboard = () => {
  const [consentToDataCollection, setConsentToDataCollection] = useState(null);
  const [userInputData, setUserInputData] = useState([]);
  const { authenticated, identity } = useAuth();

  if (identity !== null && !authenticated) {
    navigate({ to: "/login", search: { redirect: "/chat" } });
  }

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

  useEffect(() => {
    // Function to get current timestamp
    const now = Math.floor(Date.now() / 1000);

    // Function to generate a random timestamp within a range
    const randomTimestamp = (start, end) =>
      Math.floor(Math.random() * (end - start + 1) + start);

    const user_input_data = [
      {
        id: "728ed52f",
        user_id: "user123",
        timestamp: randomTimestamp(now - 31 * 24 * 3600, now - 60 * 24 * 3600), // 1-2 months ago
        text: "Hello, world!",
        status: "trained",
        category: "General",
        character_count: 13,
      },
      {
        id: "93ab2c1e",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600, now), // 0-29 days ago
        text: "What's the weather like today?",
        status: "pending",
        category: "Weather",
        character_count: 30,
      },
      {
        id: "45df8e7a",
        user_id: "user123",
        timestamp: randomTimestamp(now - 31 * 24 * 3600, now - 60 * 24 * 3600), // 1-2 months ago
        text: "Tell me a joke about programming.",
        status: "trained",
        category: "Entertainment",
        character_count: 34,
      },
      {
        id: "b12c9f3d",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600, now), // 0-29 days ago
        text: "How do I make a chocolate cake?",
        status: "pending",
        category: "Cooking",
        character_count: 32,
      },
      {
        id: "67gh4r2p",
        user_id: "user123",
        timestamp: randomTimestamp(now - 31 * 24 * 3600, now - 60 * 24 * 3600), // 1-2 months ago
        text: "What's the capital of France?",
        status: "trained",
        category: "Geography",
        character_count: 29,
      },
    ].sort((a, b) => a.status.localeCompare(b.status));

    setUserInputData(user_input_data);
  }, []);

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

            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={userInputData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
