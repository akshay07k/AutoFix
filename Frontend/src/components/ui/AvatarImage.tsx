import { cn } from "../../lib/utils";
import { forwardRef, ImgHTMLAttributes } from "react";

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(({ className, ...props }, ref) => {
  return <img ref={ref} className={cn("h-full w-full rounded-full object-cover", className)} {...props} 
  onError={(e) => (e.currentTarget.style.display = "none")}/>;
});

AvatarImage.displayName = "AvatarImage";

export { AvatarImage };
