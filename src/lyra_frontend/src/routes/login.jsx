import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: () => <Login />,
});

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const handleLogin = async () => {
    await login();
    navigate({ to: search.redirect || "/" });
  };

  return (
    <div>
      <Button onClick={() => handleLogin()}>Login</Button>
    </div>
  );
};
