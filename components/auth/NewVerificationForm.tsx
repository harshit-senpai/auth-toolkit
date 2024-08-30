"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/newVerification";
import { FormErrors } from "../FormErrors";
import { FormSuccess } from "../FormSuccess";

export const NewVerificationForm = () => {
  const [errors, setErrors] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const params = useSearchParams();

  const token = params.get("token");

  console.log(token);

  const onSubmit = useCallback(() => {
    if (!token) {
      setErrors("Token is required");
      return;
    }

    newVerification(token)
      .then((data) => {
          setSuccess(data?.success);
          setErrors(data?.error);
      })
      .catch(() => {
        setErrors("Something Went Wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      showSocial={false}
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!errors && !success && <BeatLoader />}
        {errors && <FormErrors message={errors} />}
        {success && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
};
