import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryCall, useAuth, useUpdateCall } from "@/lib/actor";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  consentToDataCollection: z.boolean().default(false).optional(),
});

export const Route = createFileRoute("/settings")({
  component: () => <Settings />,
});

const Settings = () => {
  const { authenticated, identity } = useAuth();
  const navigate = useNavigate();

  if (identity !== null && !authenticated) {
    navigate({ to: "/login", search: { redirect: "/chat" } });
  }

  const [consentToDataCollection, setConsentToDataCollection] = useState(null);
  const [
    consentToDataCollectionFormValue,
    setConsentToDataCollectionFormValue,
  ] = useState(0n);
  const [submitting, setSubmitting] = useState(false);

  const { call, data, loading, error } = useQueryCall({
    functionName: "getUserData",
    refetchOnMount: false,
    refetchInterval: false, // refetch every 5 seconds
    onSuccess: (data) => {
      if (data.length > 0) {
        form.setValue(
          "consentToDataCollection",
          data[0].consentToDataCollection === 1n ? true : false
        );
        setConsentToDataCollection(data[0].consentToDataCollection);
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      consentToDataCollection: 0n,
    },
  });

  const {
    call: consentToDataCollectionCall,
    loading: consentToDataCollectionUpdating,
  } = useUpdateCall({
    functionName: "createUser",
    args: [consentToDataCollectionFormValue],
    onLoading: () => {
      setSubmitting(true);
    },
  });

  async function onSubmit(data) {
    setConsentToDataCollectionFormValue(data.consentToDataCollection ? 1n : 0n);
    console.log(data.consentToDataCollection);
    await consentToDataCollectionCall();
    await call();

    toast({
      title: data.consentToDataCollection
        ? "Opted in"
        : "Opted out" + " to data collection",
      description:
        "You can earn token by opting in to share your data with us.",
      variant: data.consentToDataCollection ? "success" : "destructive",
    });

    setSubmitting(false);
  }

  useEffect(() => {
    call();
  }, []);

  return (
    <>
      {consentToDataCollection === null ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <LoadingSpinner className="w-6 h-6" />
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-12">Settings</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="consentToDataCollection"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Opt in to data collection</FormLabel>
                      <FormDescription>
                        You can earn token by opting in to share your data with
                        us.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={submitting}>
                Submit
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
