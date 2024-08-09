import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const Route = createRootRoute({
  component: () => <Root />,
});

const Root = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="p-2 flex gap-2 justify-between">
            <div className="flex gap-2">
              <Link to="/chat`" className="[&.active]:font-bold">
                Chat
              </Link>
              <Link to="/dashboard" className="[&.active]:font-bold">
                Dashboard
              </Link>
            </div>
            {isAuthenticated && (
              <Button onClick={() => logout()}>Logout</Button>
            )}
          </div>
          {isAuthenticated && <p>You are authenticated</p>}
          {!isAuthenticated && <p>You are not authenticated</p>}
        </>
      )}

      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  );
};
