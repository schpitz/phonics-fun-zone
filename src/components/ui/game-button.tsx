import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gameButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:translate-y-1 active:shadow-none select-none touch-manipulation",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-button hover:brightness-110 rounded-2xl",
        secondary:
          "bg-secondary text-secondary-foreground shadow-button hover:brightness-110 rounded-2xl",
        accent:
          "bg-accent text-accent-foreground shadow-button hover:brightness-110 rounded-2xl",
        success:
          "bg-success text-success-foreground shadow-button hover:brightness-110 rounded-2xl",
        highlight:
          "bg-highlight text-highlight-foreground shadow-button hover:brightness-110 rounded-2xl",
        destructive:
          "bg-destructive text-destructive-foreground shadow-button hover:brightness-110 rounded-2xl",
        ghost:
          "bg-transparent hover:bg-muted text-foreground rounded-2xl",
        outline:
          "border-4 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl",
        word:
          "bg-card text-foreground shadow-soft hover:shadow-glow-primary border-2 border-transparent hover:border-primary rounded-xl",
        letter:
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-button hover:brightness-110 rounded-3xl aspect-square",
      },
      size: {
        sm: "h-10 px-4 text-base",
        default: "h-14 px-6 text-lg",
        lg: "h-16 px-8 text-xl",
        xl: "h-20 px-10 text-2xl",
        icon: "h-14 w-14",
        "icon-lg": "h-20 w-20",
        "icon-xl": "h-24 w-24",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gameButtonVariants> {
  children: React.ReactNode;
}

const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(gameButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GameButton.displayName = "GameButton";

export { GameButton, gameButtonVariants };
