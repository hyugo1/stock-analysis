"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Wraps Radix DialogPrimitive.Root and attaches a stable `data-slot="dialog"` attribute.
 *
 * @returns A DialogPrimitive.Root element with the `data-slot="dialog"` attribute and all provided props forwarded.
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Renders a dialog trigger element with a stable `data-slot="dialog-trigger"` attribute for composition.
 *
 * @returns A DialogPrimitive.Trigger element with the `data-slot="dialog-trigger"` attribute and any provided props forwarded to it.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Renders a Radix Dialog Portal with a stable `data-slot="dialog-portal"` attribute for styling and composition.
 *
 * @param props - Props forwarded to the underlying Radix `DialogPrimitive.Portal`
 * @returns The portal element used to render dialog children outside the DOM flow
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a dialog close trigger with a stable `data-slot="dialog-close"` attribute.
 *
 * @param props - Props forwarded to the underlying close element.
 * @returns The rendered dialog close element.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders a dialog overlay with a backdrop and state-based enter/exit animations.
 *
 * @param className - Additional CSS classes to apply to the overlay container
 * @returns A React element representing the dialog overlay with backdrop and open/close animations
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders dialog content inside a portal with an overlay and an optional close button.
 *
 * Composes a Portal, Overlay, and Radix Dialog Content element, applies standard styling and
 * data-slot attributes, and forwards remaining props to the underlying Content primitive.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @param children - Elements to render inside the dialog content
 * @param showCloseButton - Whether to render the built-in close button; defaults to `true`
 * @returns The rendered dialog content element (wrapped in a portal with overlay)
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Renders the dialog header container with standardized layout and a `data-slot="dialog-header"` attribute.
 *
 * @param className - Additional class names to merge with the component's default layout classes
 * @returns A `div` element used as the dialog header with merged class names and all forwarded `div` props
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Layout container for dialog footer actions.
 *
 * Renders a div with `data-slot="dialog-footer"`, applies responsive layout classes, merges any provided `className`, and forwards other div props.
 *
 * @param className - Additional CSS classes to apply to the footer container
 * @returns The rendered footer `div` element
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a dialog title element with default typography and a stable `data-slot` attribute.
 *
 * @param className - Additional CSS classes appended to the component's default styles
 * @returns The dialog title element
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the dialog's description element with consistent styling and a stable data-slot.
 *
 * @param className - Additional CSS classes to apply to the description element
 * @returns The rendered DialogPrimitive.Description element with `data-slot="dialog-description"` and merged classes
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}