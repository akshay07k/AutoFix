import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "default" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-md font-medium bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white transition-all duration-300 ease-in-out",
          variant === "ghost" && "bg-transparent hover:bg-gray-800",
          size === "icon" && "h-10 w-10 p-2",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
