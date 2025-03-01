import { cn } from "../../lib/utils";
import { forwardRef } from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative flex h-10 w-10 rounded-full bg-gray-800", className)} {...props} />;
});

Avatar.displayName = "Avatar";

export { Avatar };
