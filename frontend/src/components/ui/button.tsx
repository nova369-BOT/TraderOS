import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Carbon Institutional (2026-09-21): no hover-scale bounces, no glow
        // shadows — chrome stays austere; hover is a brightness step.
        default: "bg-white text-black hover:bg-neutral-200",
        destructive: "bg-neon-pink text-white hover:opacity-90",
        outline: "border border-border bg-transparent hover:bg-glass-bg hover:border-electric-blue hover:shadow-glow-blue",
        secondary: "bg-glass-bg border border-glass-border backdrop-blur-lg hover:border-neon-purple hover:shadow-glow-purple",
        ghost: "hover:bg-black/10 dark:hover:bg-white/10",
        link: "text-electric-blue underline-offset-4 hover:underline hover:text-neon-purple",
        premium: "bg-gradient-premium text-white hover:opacity-90",
      },
      // Density v2 (owner "shrink more", 2026-09-19): 24/20/28px — the
      // band pro scalping terminals ship (ATAS DOM buttons ~20-24px).
      size: {
        default: "h-6 px-2.5",
        sm: "h-5 rounded px-2",
        lg: "h-7 rounded-md px-3 text-base",
        icon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
