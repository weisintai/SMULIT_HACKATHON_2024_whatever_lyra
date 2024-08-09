import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 flex">
        <div>
          <Link to="/chat`" className="[&.active]:font-bold">
            Chat
          </Link>
          <Link to="/dashboard" className="[&.active]:font-bold">
            Login
          </Link>
        </div>
        <div>Logout</div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
});
