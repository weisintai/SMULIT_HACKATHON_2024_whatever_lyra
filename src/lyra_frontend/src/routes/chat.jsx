import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/actor";

export const Route = createFileRoute("/chat")({
  component: () => <Chat />,
});

const Chat = () => {
  const { authenticated, identity } = useAuth();
  const navigate = useNavigate();

  if (identity !== null && !authenticated) {
    navigate({ to: "/login", search: { redirect: "/chat" } });
  }

  return (
    <div className="p-2">
      <h3>Welcome Chat!</h3>
    </div>
  );
};
