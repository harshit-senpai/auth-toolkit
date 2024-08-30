import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorsProps {
  message: string | undefined;
}

export const FormErrors = ({ message }: FormErrorsProps) => {
  return (
    <div className="flex items-center gap-x-2 bg-destructive/15 text-destructive p-3 rounded-md text-sm">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
