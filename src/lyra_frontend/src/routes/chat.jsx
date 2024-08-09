import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/chat")({
  // beforeLoad: async ({ context, location }) => {
  //   if (!context.isAuthenticated) {
  //     throw redirect({
  //       to: "/login",
  //       search: {
  //         // Use the current location to power a redirect after login
  //         // (Do not use `router.state.resolvedLocation` as it can
  //         // potentially lag behind the actual current location)
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
  component: () => <Chat />,
});

const Chat = () => {
  const { isAuthenticated, actor } = useAuth();

  return (
    <div className="p-2">
      <h3>Welcome Chat!</h3>
      <p>You are logged in</p>
    </div>
  );
};
