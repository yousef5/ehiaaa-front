/* eslint-disable react/display-name */
/* =========================================================================
   Dialog.tsx –  حوارات متداخلة + حركة Scale-In من المركز
   ======================================================================== */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

let globalDialogCounter = 0;

/* --------- 1. Variants -------------------------------------------------- */
const dialogVariants = cva(
  "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " +
    "origin-center grid w-full gap-0 border shadow-2xl duration-300 " +
    /* حركة التكبير */
    "data-[state=open]:animate-in data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 " +
    /* Fade */
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 " +
    /* الشكل العام */
    "bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-gray-900/20 " +
    "dark:bg-gray-900/95 dark:border-gray-700/50 dark:shadow-black/40",
  {
    variants: {
      size: {
        xs: "max-w-xs  w-[90%] sm:w-full rounded-2xl",
        sm: "max-w-sm  w-[90%] sm:w-full rounded-2xl",
        md: "max-w-md  w-[90%] sm:w-full rounded-2xl",
        lg: "max-w-lg  w-[90%] sm:w-full rounded-2xl",
        xl: "max-w-xl  w-[90%] sm:w-full rounded-2xl",
        "2xl": "max-w-2xl w-[90%] sm:w-full rounded-2xl",
        "3xl": "max-w-3xl w-[90%] sm:w-full rounded-2xl",
        "4xl": "max-w-4xl w-[90%] sm:w-full rounded-2xl",
        "5xl": "max-w-5xl w-[95%] sm:w-full rounded-2xl",
        full: "h-screen max-w-full w-full rounded-none",
      },
    },
    defaultVariants: { size: "md" },
  }
);

/* --------- 2. Radix Shortcuts & Overlay ------------------------------- */
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { z: number }
>(({ className, z, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    style={{ zIndex: z }}
    className={cn(
      "fixed inset-0 bg-black/40 backdrop-blur-sm " +
        "supports-[backdrop-filter]:bg-black/25" +
        "data-[state=open]:animate-in data-[state=open]:fade-in-0" +
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    aria-hidden={undefined}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* --------- 3. Content (z-index ديناميكى للتعشيش) ---------------------- */
interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  overlayClass?: string;
  overlayScroll?: boolean;
  hiddenCloseIcon?: boolean;
  contentPadding?: string;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      overlayClass,
      overlayScroll = false,
      hiddenCloseIcon = true,
      contentPadding = "p-6",
      ...props
    },
    ref
  ) => {
    // depth
    const depthRef = React.useRef<number | null>(null);
    if (depthRef.current === null) {
      globalDialogCounter += 1;
      depthRef.current = globalDialogCounter;
    }
    const depth = depthRef.current;
    const overlayZIndex = 1000 + depth * 20;
    const contentZIndex = overlayZIndex + 1;

    React.useEffect(
      () => () => {
        globalDialogCounter -= 1;
      },
      []
    );

    return (
      <DialogPortal>
        <DialogOverlay
          z={overlayZIndex}
          className={cn(
            overlayScroll ? "overflow-y-auto" : "overflow-hidden",
            overlayClass
          )}
        />

        <DialogPrimitive.Content
          ref={ref}
          style={{ zIndex: contentZIndex }}
          className={cn(
            dialogVariants({ size }),

            contentPadding,
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 " +
              "focus-visible:ring-offset-2 focus-visible:ring-offset-white" +
              "dark:focus-visible:ring-offset-gray-900",
            className
          )}
          aria-modal="true"
          aria-hidden={undefined}
          {...props}
        >
          {children}

          {!hiddenCloseIcon && (
            <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full p-2 opacity-70 transition duration-200 hover:bg-gray-100 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:ring-offset-2 dark:hover:bg-gray-800 dark:hover:text-gray-200">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

/* --------- 4. Header / Body / Footer / Title / Desc ------------------- */
function DialogHeader(p: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...p}
      className={cn(
        "flex flex-col space-y-3 border-b border-gray-200/50 px-6 py-6 dark:border-gray-700/50",
        p.className
      )}
    />
  );
}
function DialogBody(p: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...p}
      className={cn(
        "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 max-h-[70vh] flex-1 overflow-y-auto px-6 py-6",
        p.className
      )}
    />
  );
}
function DialogFooter(p: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...p}
      className={cn(
        "flex flex-col-reverse gap-3 border-t border-gray-200/50 bg-gray-50/50 px-6 py-4 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/30 sm:flex-row sm:justify-end sm:gap-2",
        p.className
      )}
    />
  );
}
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>((props, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100",
      props.className
    )}
    {...props}
  />
));
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>((props, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm leading-relaxed text-gray-600 dark:text-gray-400",
      props.className
    )}
    {...props}
  />
));

/* --------- 5. Exports -------------------------------------------------- */
export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
