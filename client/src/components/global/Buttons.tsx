import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";
import { IoReloadCircleOutline } from "react-icons/io5";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export const SubmitButton = ({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      sx={{
        textTransform: "capitalize",
      }}
    >
      {pending ? (
        <>
          <IoReloadCircleOutline className="mr-2 h-4 w-4 animate-spin" />
          please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};
