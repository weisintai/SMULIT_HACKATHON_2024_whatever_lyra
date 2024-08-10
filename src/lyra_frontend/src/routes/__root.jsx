import {
  createRootRoute,
  Link,
  Outlet,
  useRouter,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";
import { useAuth } from "@/lib/actor";
import { Bot, Pen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";

export const Route = createRootRoute({
  component: () => <Root />,
});

const Root = () => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const username = "lyra-ai";

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
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden text-sm grow text-ellipsis whitespace-nowrap">
                      Lyra
                    </div>
                    <Button variant="icon">
                      <Pen className="w-4 h-4" />
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
                      className="flex-1 block p-2 overflow-hidden text-sm truncate transition-colors rounded-md whitespace-nowrap [&.active]:bg-muted/50"
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

              <div className="flex items-center justify-between  p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="p-0">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={`https://vercel.com/api/www/avatar?teamId=lyra&s=44`}
                            alt="User avatar"
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="mr-2">User</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link to="/dashboard">
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <button
                      className="w-full"
                      onClick={async () => {
                        await logout();
                        navigate({ to: "/login" });
                      }}
                    >
                      <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5 text-gray-400" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col p-2 max-h-screen">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}

      <Toaster />
    </>
  );
};
