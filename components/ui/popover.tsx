"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Renders a Popover root element with a `data-slot="popover"` attribute and forwards all provided props.
 *
 * @param props - Props passed to the underlying Popover root component
 * @returns The Popover root element
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Wraps the Radix Popover Trigger and marks it with `data-slot="popover-trigger"`.
 *
 * @param props - Properties forwarded to the underlying PopoverPrimitive.Trigger
 * @returns The Popover trigger element with forwarded props
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Renders styled popover content inside a Portal with sensible defaults.
 *
 * @param className - Additional CSS class names to append to the content's classes
 * @param align - How the popover is aligned relative to the trigger (defaults to "center")
 * @param sideOffset - Distance in pixels between the trigger and the popover (defaults to 4)
 * @returns A React element representing the popover content
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Wrapper around Radix's Popover Anchor that attaches a `data-slot="popover-anchor"` attribute and forwards all props.
 *
 * @returns A Popover Anchor element with the provided props and a `data-slot="popover-anchor"` attribute.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }