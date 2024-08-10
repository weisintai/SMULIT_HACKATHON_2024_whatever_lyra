import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import { useAuth } from "@/lib/actor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryCall, useUpdateCall } from "@/lib/actor";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, MessageSquare, Search, Settings } from "lucide-react";
import { ChatLayout } from "@/components/chat/chat-layout";
import { getCookie, setCookie } from "@/lib/cookie";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ClipboardIcon,
  PenIcon,
  RefreshCcwIcon,
  SparkleIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  ZapIcon,
} from "@/components/ai-chat-example";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "@/components/ai-chat-example";

export const Route = createFileRoute("/chat")({
  component: () => <Chat />,
});

const SuperscriptTag = ({ number }) => {
  return (
    <sup className="inline-flex items-center justify-center w-3 h-3 ml-1 text-[0.5rem] font-bold text-white bg-gray-600 rounded-full">
      {number}
    </sup>
  );
};

const Chat = () => {
  const { authenticated, identity } = useAuth();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [consentToDataCollection, setConsentToDataCollection] = useState(0n);

  const layout = getCookie("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout) : undefined;

  const { call, data, loading, error } = useQueryCall({
    functionName: "getUserData",
    refetchOnMount: false,
    onSuccess: (data) => {
      setIsNewUser(data.length === 0);

      if (data.length > 0) {
        setConsentToDataCollection(data[0].consentToDataCollection);
      }
    },
  });

  const {
    call: consentToDataCollectionCall,
    loading: consentToDataCollectionUpdating,
  } = useUpdateCall({
    functionName: "createUser",
    args: [consentToDataCollection],
  });

  if (identity !== null && !authenticated) {
    navigate({ to: "/login", search: { redirect: "/chat" } });
  }

  useEffect(() => {
    call();
  }, []);

  return (
    <>
      <div className="p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col items-start flex-1 max-w-2xl gap-8 px-4 mx-auto">
              <div className="flex items-start gap-4">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">You</div>
                  <div className="prose text-muted-foreground">
                    <p>
                      Can you explain airplane turbulence to someone who has
                      never flown before? Make it conversational and concise.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="w-6 h-6 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">Lyra</div>
                  <div className="prose text-muted-foreground">
                    <p>
                      Of course! Imagine you&apos;re in a car driving down a
                      bumpy road, and the ride isn&apos;t perfectly smooth.
                      Sometimes, you hit small potholes or bumps, right? Well,
                      when you&apos;re in an airplane, it&apos;s kind of like
                      that, but in the sky.
                    </p>
                    <p>
                      Airplane turbulence happens when the plane encounters
                      pockets of air that are moving differently. It&apos;s like
                      sailing a boat on choppy water. These air pockets can make
                      the plane feel like it&apos;s bouncing or shaking a bit.
                      It&apos;s completely normal and usually not dangerous at
                      all.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="sr-only">Upvote</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <ThumbsDownIcon className="w-4 h-4" />
                      <span className="sr-only">Downvote</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900"
                    >
                      <RefreshCcwIcon className="w-4 h-4" />
                      <span className="sr-only">Regenerate</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-background">
              <div className="relative">
                <Textarea
                  placeholder="Message Lyra..."
                  name="message"
                  id="message"
                  rows={1}
                  className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute w-8 h-8 top-3 right-3"
                  disabled
                >
                  <ArrowUpIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <p className="text-xs font-medium text-center text-neutral-700">
                Lyra can make mistakes. Consider checking important information.
              </p>
            </div>
          </>
        )}
      </div>

      {isNewUser && (
        <AlertDialog open={isNewUser}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome</AlertDialogTitle>
              <AlertDialogDescription>
                Do you consent to data collection?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  disabled={consentToDataCollectionUpdating}
                  variant="secondary"
                  onClick={async () => {
                    setConsentToDataCollection(0n);
                    consentToDataCollectionCall();
                    await call();
                  }}
                >
                  No
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  disabled={consentToDataCollectionUpdating}
                  variant="primary"
                  onClick={async () => {
                    setConsentToDataCollection(1n);
                    console.log(consentToDataCollection);
                    consentToDataCollectionCall();
                    await call();
                  }}
                >
                  Yes
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
