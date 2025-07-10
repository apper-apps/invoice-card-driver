import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <label
      className={cn(
        "form-label",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;