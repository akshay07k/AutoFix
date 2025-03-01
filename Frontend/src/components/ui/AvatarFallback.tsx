import { cn } from "../../lib/utils";
import { forwardRef } from "react";


export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {}

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, children, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-700", className)} {...props}>
      {children}
    </span>
  );
});

AvatarFallback.displayName = "AvatarFallback";

export { AvatarFallback };
