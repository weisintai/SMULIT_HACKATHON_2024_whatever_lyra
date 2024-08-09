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
import { useQueryCall, useUpdateCall } from "@/lib/actor";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chat")({
  component: () => <Chat />,
});

const Chat = () => {
  const { authenticated, identity } = useAuth();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [consentToDataCollection, setConsentToDataCollection] = useState(0n);

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
            <h3>Welcome Chat! </h3>
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
