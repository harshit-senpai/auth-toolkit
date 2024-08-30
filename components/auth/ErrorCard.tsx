import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./CardWrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocial={false}
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
