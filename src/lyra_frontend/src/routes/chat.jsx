import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
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
import { useQueryCall, useUpdateCall } from "../lib/actor";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chat")({
  component: () => <Chat />,
});

const Chat = () => {
  const { authenticated, identity } = useAuth();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [consentToDataCollection, setConsentToDataCollection] = useState(0);

  const { call, data, loading, error } = useQueryCall({
    functionName: "getUserData",
    refetchOnMount: true,
    onSuccess: (data) => {
      setIsNewUser(data.length === 0);

      if (data.length > 0) {
        setConsentToDataCollection(data[0].consentToDataCollection);
      }
    },
  });

  const { call: consentToDataCollectionCall } = useUpdateCall({
    functionName: "createUser",
    args: [consentToDataCollection],
  });

  if (identity !== null && !authenticated) {
    navigate({ to: "/login", search: { redirect: "/chat" } });
  }

  return (
    <>
      <div className="p-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3>Welcome Chat! </h3>
            <p>
              Your consent to data collection is{" "}
              {consentToDataCollection.toString()}
            </p>
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
                  variant="secondary"
                  onClick={() => {
                    setIsNewUser(false);
                    setConsentToDataCollection(0);
                    consentToDataCollectionCall();
                    call();
                  }}
                >
                  No
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsNewUser(false);
                    setConsentToDataCollection(1);
                    consentToDataCollectionCall();
                    call();
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
