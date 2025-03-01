import { cn } from "../../lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        "bg-gray-900 border-gray-800 text-white placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
export { Input };
