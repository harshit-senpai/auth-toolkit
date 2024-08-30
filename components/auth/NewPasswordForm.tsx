"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./CardWrapper";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormErrors } from "../FormErrors";
import { FormSuccess } from "../FormSuccess";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";

export const NewPasswordForm = () => {
  const params = useSearchParams();
  const token = params.get("token");

  const [errors, setErrors] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setErrors("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setErrors(data?.error);
          setSuccess(data?.success);
        })
        .catch(() => {
          setErrors("Something went wrong");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {errors && <FormErrors message={errors} />}
          {success && <FormSuccess message={success} />}
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
