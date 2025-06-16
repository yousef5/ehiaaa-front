import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-out ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.96] select-none relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:from-primary/90 hover:to-primary/80 border border-primary/20 backdrop-blur-sm",
        destructive:
          "bg-gradient-to-br from-destructive via-destructive to-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/30 hover:from-destructive/90 hover:to-destructive/80 border border-destructive/20 backdrop-blur-sm",
        outline:
          "border-2 border-input bg-background/80 backdrop-blur-sm text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:border-input/80 hover:backdrop-blur-md",
        secondary:
          "bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-secondary-foreground shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/25 hover:from-secondary/90 hover:to-secondary/70 border border-secondary/30 backdrop-blur-sm",
        ghost:
          "text-foreground/80 hover:bg-accent/80 hover:text-accent-foreground hover:backdrop-blur-sm hover:shadow-sm transition-colors duration-150",
        link: "text-primary underline-offset-4 hover:underline font-medium hover:text-primary/90 transition-colors duration-150",
      },
      size: {
        default: "h-10 px-5 py-2.5 gap-2",
        sm: "h-9 rounded-md px-4 py-2 gap-1.5 text-sm",
        lg: "h-12 rounded-xl px-8 py-3 gap-2.5 text-base font-semibold",
        icon: "h-10 w-10 rounded-lg",
        xs: "h-8 px-3 py-1.5 gap-1 text-xs rounded-md",
        xl: "h-14 px-10 py-4 gap-3 text-lg font-bold rounded-xl",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl",
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
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // If using asChild, keep it simple to avoid Slot conflicts
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    // For regular button, we can use all the premium features
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}

        {children}

        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}

        {/* Subtle shine effect on hover */}
        <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out hover:translate-x-[100%]" />
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
