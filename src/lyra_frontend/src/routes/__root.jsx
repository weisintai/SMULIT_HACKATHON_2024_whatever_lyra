import {
  createRootRoute,
  Link,
  Outlet,
  useRouter,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAuth } from "@/lib/actor";

export const Route = createRootRoute({
  component: () => <Root />,
});

const Root = () => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="p-2 flex gap-2 justify-between">
        <div className="flex gap-2">
          <Link to="/chat" className="[&.active]:font-bold">
            Chat
          </Link>
          <Link to="/dashboard" className="[&.active]:font-bold">
            Dashboard
          </Link>
        </div>
        {authenticated && (
          <Button
            onClick={async () => {
              await logout();
              navigate({ to: "/login" });
            }}
          >
            Logout
          </Button>
        )}
      </div>

      <Outlet />
    </>
  );
};
