import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react"; // You can replace with another icon if needed

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
    return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                `h-5 w-5 rounded-sm border border-primary 
         flex items-center justify-center 
         data-[state=checked]:bg-[#6A38C2]
         data-[state=checked]:text-white 
         transition duration-200 
         focus-visible:outline-none focus-visible:ring-2 
         focus-visible:ring-primary/50`,
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator>
                <Check className="h-3 w-3 text-white" /> {/* White checkmark */}
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
