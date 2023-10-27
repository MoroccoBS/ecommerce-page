import { cn } from "@/lib/utils";
import {
  Button as ButtonShadCn,
  ButtonProps as ButtonShadCnProps,
} from "./ui/button";

interface ButtonProps extends ButtonShadCnProps {
  children: React.ReactNode;
  primary?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <ButtonShadCn
      {...props}
      className={cn(
        props.className,
        "bg-primary rounded-lg text-white font-bold text-lg hover py-6 hover:bg-primary hover:opacity-75 transition-all hover:text-white"
        // props.primary ? "hover:bg-primary/80" : "hover:bg-primary/60"
      )}
    >
      {props.children}
    </ButtonShadCn>
  );
}
