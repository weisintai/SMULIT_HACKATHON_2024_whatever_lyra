import { useState, useEffect } from "react";
import { idlFactory, canisterId } from "../../declarations/lyra_backend";
import { useAuthClient } from "./lib/use-auth-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

function App() {
  const identityProvider =
    // eslint-disable-next-line no-undef
    process.env.DFX_NETWORK === "local"
      ? // eslint-disable-next-line no-undef
        `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
      : "https://identity.ic0.app";

  const { isAuthenticated, login, logout, actor } = useAuthClient({
    loginOptions: {
      identityProvider,
    },
    actorOptions: {
      canisterId,
      idlFactory,
    },
  });

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
  });

  const [whoamiText, setWhoamiText] = useState("");
  const [fetching, setFetching] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data) {
    setFetching(true);
    const res = await actor.saveUserData(data);
    setFetching(false);
  }

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated && actor) {
        setFetching(true);

        const whoami = await actor.whoami();
        const userData = (await actor.getUserData())[0];

        setWhoamiText(whoami + ", " + userData.name + ", " + userData.email);

        if (userData) {
          form.setValue("name", userData.name);
          form.setValue("email", userData.email);
        }

        setFetching(false);
      }
    }
    fetchData();
  }, [isAuthenticated, actor]);

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <section id="login-section">
        <h2>Log in and test your identity</h2>
        <div className="flex  gap-2">
          <Button id="login" onClick={login}>
            Login with Internet Identity
          </Button>
          <Button id="logout" onClick={logout}>
            Logout
          </Button>
        </div>
        <p>{isAuthenticated ? "You are logged in" : "You are not logged in"}</p>
      </section>

      {isAuthenticated && (
        <>
          <Button
            disabled={fetching}
            onClick={async () => {
              setFetching(true);
              const whoami = await actor.whoami();
              const userData = (await actor.getUserData())[0];

              setWhoamiText(
                whoami + ", " + userData.name + ", " + userData.email
              );
              setFetching(false);
            }}
          >
            Whoami {fetching ? "..." : ""}
          </Button>
          <section id="whoami">{whoamiText.toString()}</section>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="alex" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="alex@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={fetching}>
                Submit
              </Button>
            </form>
          </Form>
        </>
      )}
    </main>
  );
}

export default App;
