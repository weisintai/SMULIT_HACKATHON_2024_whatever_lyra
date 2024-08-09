import { createReactor } from "@ic-reactor/react";
import {
  canisterId,
  idlFactory,
  lyra_backend,
} from "../../../declarations/lyra_backend";

type Actor = typeof lyra_backend;

const isProduction = process.env.NODE_ENV === "production";

export const { useActorStore, useAuth, useQueryCall, useUpdateCall } =
  createReactor<Actor>({
    canisterId,
    idlFactory,
    host: "http://localhost:4943",
    withLocalEnv: true,
    withProcessEnv: true,
  });
