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
    <div className="bg-gray-900 text-white min-h-screen font-montserrat flex flex-col items-center justify-center">
      {/* Background Bubbles */}
      <div className="absolute top-14 left-14 w-60 h-60 bg-emerald-400 rounded-full opacity-60 animate-bubble-1"></div>
      <div className="absolute bottom-4 left-3/4 w-65 h-65 bg-indigo-400 rounded-full opacity-60 animate-bubble-5"></div>
      <div className="absolute top-2/4 right-1/3 w-20 h-20 bg-fuchsia-500 rounded-full opacity-60 animate-bubble-3"></div>
      <div className="absolute bottom-24 right-2/3 w-40 h-40 bg-rose-500 rounded-full opacity-60 animate-bubble-2"></div>
      <div className="absolute top-2/5 left-2/5 w-18 h-18 bg-violet-500 rounded-full opacity-60 animate-bubble-4"></div>

      <div className="absolute w-55 h-55 bg-blue-300 rounded-full opacity-60 animate-bubble-1"></div>
      <div className="absolute bottom-10 right-10 w-65 h-65 bg-teal-300 rounded-full opacity-60 animate-bubble-2"></div>
      <div className="absolute top-20 left-20 w-30 h-30 bg-purple-300 rounded-full opacity-60 animate-bubble-3"></div>
      <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-yellow-300 rounded-full opacity-60 animate-bubble-4"></div>
      <div className="absolute top-1/2 right-1/4 w-26 h-26 bg-pink-300 rounded-full opacity-60 animate-bubble-5"></div>

      <div className="absolute w-55 h-55 bg-indigo-400 rounded-full opacity-60 animate-bubble-6"></div>
      <div className="absolute bottom-10 right-10 w-55 h-55 bg-fuchsia-500 rounded-full opacity-60 animate-bubble-6"></div>
      <div className="absolute top-20 left-20 w-30 h-30 bg-purple-300 rounded-full opacity-60 animate-bubble-7"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-yellow-300 rounded-full opacity-60 animate-bubble-8"></div>
      <div className="absolute top-1/2 right-1/4 w-26 h-26 bg-pink-300 rounded-full opacity-60 animate-bubble-9"></div>

      <div className="absolute w-full h-full backdrop-blur-md isolate aspect-video bg-gray/20 shadow-lg ring-1 ring-black/5"></div>
    </div>
  );
}

export default App;
