import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
        outline:
          "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
        ghost: "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
        glow: "relative overflow-hidden border border-blue-500/20 bg-white dark:bg-gray-900 px-4 py-2 text-gray-800 dark:text-white shadow-[0_0_20px_rgba(0,0,0,0.25)] backdrop-blur-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:translate-y-full after:bg-gradient-to-r after:from-blue-400 after:via-blue-600 after:to-blue-400 after:opacity-70 after:transition after:duration-300 after:content-[''] hover:border-blue-500/40 hover:after:translate-y-0 hover:after:animate-[pulse_2s_ease-in-out_infinite]",
        gradient: "relative p-[1px] bg-gradient-to-tr from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-lg before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-tr before:from-blue-600 before:to-blue-700 before:opacity-0 before:transition hover:before:opacity-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
