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
import { getCookie, setCookie } from "@/lib/cookie";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import ChatInterface from "@/components/chat-interface";

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

  const [messages, setMessages] = useState([
    {
      sender: "You",
      content:
        "Can you explain airplane turbulence to someone who has never flown before? Make it conversational and concise.",
      avatar: "/placeholder-user.jpg",
    },
    {
      sender: "Lyra",
      content:
        "Of course! Imagine you're in a car driving down a bumpy road, and the ride isn't perfectly smooth. Sometimes, you hit small potholes or bumps, right? Well, when you're in an airplane, it's kind of like that, but in the sky. Airplane turbulence happens when the plane encounters pockets of air that are moving differently. It's like sailing a boat on choppy water. These air pockets can make the plane feel like it's bouncing or shaking a bit. It's completely normal and usually not dangerous at all.",
      avatar: "/placeholder-user.jpg",
    },
  ]);

  const handleSendMessage = (message) => {
    setMessages([
      ...messages,
      {
        sender: "You",
        content: message,
        avatar: "/placeholder-user.jpg",
      },
    ]);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <LoadingSpinner className="w-6 h-6" />
        </div>
      ) : (
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      )}

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
