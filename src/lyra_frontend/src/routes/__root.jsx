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
import {
  BotIcon,
  ChevronDownIcon,
  ClipboardIcon,
  PenIcon,
  RefreshCcwIcon,
  SparkleIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  ZapIcon,
} from "@/components/ai-chat-example";

export const Route = createRootRoute({
  component: () => <Root />,
});

const Root = () => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {authenticated ? (
        <>
          <div className="grid md:grid-cols-[260px_1fr] min-h-screen w-screen bg-background text-foreground">
            <div className="flex-col hidden gap-2 md:flex">
              <div className="sticky top-0 p-2">
                <Link to={"/chat/new"}>
                  <Button
                    variant="ghost"
                    className="justify-start w-full gap-2 px-2 text-left"
                  >
                    <div className="flex items-center justify-center rounded-full w-7 h-7 bg-primary text-primary-foreground">
                      <BotIcon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden text-sm grow text-ellipsis whitespace-nowrap">
                      Lyra
                    </div>
                    <Button variant="icon">
                      <PenIcon className="w-4 h-4" />
                    </Button>
                  </Button>
                </Link>
              </div>
              <div className="flex-1 overflow-auto">
                <div>
                  <div className="grid gap-1 p-2 text-foreground">
                    <div className="px-2 text-xs font-medium text-muted-foreground">
                      Today
                    </div>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap bg-muted/50"
                    >
                      Airplane Turbulence: Sky&apos;s Rollercoaster
                    </Link>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      How to make a chat app with React
                    </Link>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      Cooking recipe for disaster
                    </Link>
                  </div>
                  <div className="grid gap-1 p-2 text-foreground">
                    <div className="px-2 text-xs font-medium text-muted-foreground">
                      30 days ago
                    </div>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      Python functon for Fibonacci sequence
                    </Link>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      Five largest lakes in the world
                    </Link>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      Weather forecast in Seattle
                    </Link>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      Chicken or the egg?
                    </Link>
                    <Link
                      to="/chat"
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap hover:bg-muted/50"
                    >
                      Neural networks for dummies
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-2 flex gap-2 justify-between">
                <div className="flex gap-2">
                  <Link to="/chat" className="[&.active]:font-bold">
                    Chat
                  </Link>
                  <Link to="/dashboard" className="[&.active]:font-bold">
                    Dashboard
                  </Link>
                </div>

                <Button
                  onClick={async () => {
                    await logout();
                    navigate({ to: "/login" });
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div className="flex flex-col pt-10">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
