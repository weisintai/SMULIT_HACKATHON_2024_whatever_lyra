import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/lib/actor";

export const Route = createFileRoute("/login")({
  component: () => <Login />,
});

const Login = () => {
  const {
    login,
    logout,
    loginLoading,
    loginError,
    identity,
    authenticating,
    authenticated,
  } = useAuth();

  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const identityProvider =
    // eslint-disable-next-line no-undef
    process.env.DFX_NETWORK === "local"
      ? // eslint-disable-next-line no-undef
        `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
      : "https://identity.ic0.app";

  return (
    <Button
      onClick={async () => {
        await login({
          identityProvider,
          onSuccess: async () => {
            navigate({ to: redirect ?? "/chat" });
          },
        });
      }}
      disabled={authenticating}
    >
      Login
    </Button>
  );
};
