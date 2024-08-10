import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryCall } from "@/lib/actor";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/actor";
import { LoadingSpinner } from "@/components/loading-spinner";

import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/columns";

export const Route = createFileRoute("/dashboard")({
  component: () => <Dashboard />,
});

const Dashboard = () => {
  const [consentToDataCollection, setConsentToDataCollection] = useState(null);
  const [userInputData, setUserInputData] = useState([]);
  const { authenticated, identity } = useAuth();
  const navigate = useNavigate();

  if (identity !== null && !authenticated) {
    navigate({ to: "/login", search: { redirect: "/chat" } });
  }

  const { call, data, error } = useQueryCall({
    functionName: "getUserData",
    refetchOnMount: true,
    refetchInterval: false, // refetch every 5 seconds
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
    const randomTimestamp = (start, end) => {
      return new Date(start + Math.random() * (end - start)).getTime();
    };

    const user_input_data = [
      {
        id: "728ed52f",
        user_id: "user123",
        timestamp: randomTimestamp(
          now - 31 * 24 * 3600000,
          now - 60 * 24 * 3600000
        ),
        text: "Hello, world!",
        status: "trained",
        category: "General",
        character_count: 13,
      },
      {
        id: "93ab2c1e",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "What's the weather like today?",
        status: "pending",
        category: "Weather",
        character_count: 30,
      },
      {
        id: "45df8e7a",
        user_id: "user123",
        timestamp: randomTimestamp(
          now - 31 * 24 * 3600000,
          now - 60 * 24 * 3600000
        ),
        text: "Tell me a joke about programming.",
        status: "trained",
        category: "Entertainment",
        character_count: 34,
      },
      {
        id: "b12c9f3d",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "How do I make a chocolate cake?",
        status: "pending",
        category: "Cooking",
        character_count: 32,
      },
      {
        id: "67gh4r2p",
        user_id: "user123",
        timestamp: randomTimestamp(
          now - 31 * 24 * 3600000,
          now - 60 * 24 * 3600000
        ),
        text: "What's the capital of France?",
        status: "trained",
        category: "Geography",
        character_count: 29,
      },
      // Adding new entries from the original conversation with hardcoded IDs
      {
        id: "abc123",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "Can you explain airplane turbulence to someone who has never flown before? Make it conversational and concise.",
        status: "pending",
        category: "Travel",
        character_count: 107,
      },
      {
        id: "def456",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "Thanks, that's helpful! By the way, I'm planning my first flight from New York to London next month. I'm a bit nervous about the long flight.",
        status: "pending",
        category: "Travel",
        character_count: 145,
      },
      {
        id: "ghi789",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "That's great advice, thank you. I think I feel better about it now. I'll make sure to stay hydrated and try to adjust my sleep schedule before the flight.",
        status: "pending",
        category: "Travel",
        character_count: 165,
      },
      {
        id: "jkl012",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "No more questions for now, thanks! I'll reach out if I think of anything else.",
        status: "pending",
        category: "General",
        character_count: 78,
      },
      {
        id: "mno345",
        user_id: "user123",
        timestamp: randomTimestamp(now - 29 * 24 * 3600000, now),
        text: "Hey Lyra, can you remind me about my upcoming travel plans?",
        status: "pending",
        category: "Travel",
        character_count: 58,
      },
    ].sort((a, b) => a.status.localeCompare(b.status));

    setUserInputData(user_input_data);
  }, []);

  return (
    <div>
      <div className="p-2">
        {consentToDataCollection === null ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <LoadingSpinner className="w-6 h-6" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

            <DataTable columns={columns} data={userInputData} />
          </>
        )}
      </div>
    </div>
  );
};
