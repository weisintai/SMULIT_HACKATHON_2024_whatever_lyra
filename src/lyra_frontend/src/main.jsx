import React, { StrictMode, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth, AuthProvider, AuthContext } from "./hooks/useAuth";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { idlFactory, canisterId } from "../../declarations/lyra_backend";
import { useAuthClient } from "./lib/use-auth-client";

// Create a new router instance
const router = createRouter({ routeTree });

// Render the app
const rootElement = document.getElementById("root");

function App() {
  const isAuthenticated = useAuth().isAuthenticated;

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
}
