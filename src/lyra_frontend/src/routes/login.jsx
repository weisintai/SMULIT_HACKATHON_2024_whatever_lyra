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
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <Button
        className="flex gap-2"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={12 * (51.429 / 24)}
          height="12"
          viewBox="0 0 59.294 28"
        >
          <g fill="#FFFFFF" transform="translate(-0.001 0)">
            <path d="M48.691 23.265c-4.047 0-8.322-2.646-10.42-4.567-2.293-2.1-8.596-8.936-8.624-8.967C25.514 5.118 19.957 0 14.412 0 7.734 0 1.91 4.624.395 10.751c.117-.403 2.238-6.016 10.208-6.016 4.048 0 8.322 2.646 10.42 4.567 2.293 2.1 8.596 8.936 8.624 8.967 4.133 4.612 9.69 9.73 15.235 9.73 6.678 0 12.502-4.624 14.017-10.751-.117.403-2.238 6.016-10.208 6.016Z" />
            <path d="M29.647 18.27c-.014-.017-1.83-1.985-3.864-4.132-1.1 1.305-2.685 3.084-4.507 4.68-3.395 2.977-5.602 3.6-6.864 3.6-4.762 0-8.646-3.776-8.646-8.418 0-4.642 3.88-8.39 8.646-8.419.173 0 .382.018.636.063-1.432-.55-2.953-.909-4.445-.909-7.967 0-10.09 5.61-10.207 6.015A13.507 13.507 0 0 0 .001 14c0 7.72 6.368 14 14.309 14 3.31 0 7.018-1.697 10.838-5.044 1.805-1.582 3.37-3.275 4.546-4.636a2.261 2.261 0 0 1-.045-.05l-.002.001Z" />
            <path d="M29.647 9.73c.015.016 1.83 1.985 3.864 4.132 1.1-1.305 2.685-3.084 4.507-4.68 3.395-2.977 5.602-3.6 6.864-3.6 4.762 0 8.646 3.776 8.646 8.418 0 4.616-3.88 8.39-8.646 8.419a3.67 3.67 0 0 1-.636-.063c1.432.55 2.954.909 4.445.909 7.967 0 10.09-5.61 10.207-6.015.258-1.044.395-2.132.395-3.249C59.294 6.281 52.823 0 44.883 0c-3.311 0-6.916 1.698-10.735 5.044C32.342 6.626 30.776 8.32 29.6 9.68l.045.05h.001Z" />
          </g>
        </svg>
        Login with Internet Identity
      </Button>
    </div>
  );
};
