"use client"

import {
  CircleCheckIcon,
  CircleDashedIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          // Custom toast colors
          "--success-bg": "hsl(142.1 76.2% 36.3% / 0.9)",
          "--success-text": "hsl(355.7 100% 97.3%)",
          "--error-bg": "hsl(0 84.2% 60.2% / 0.9)",
          "--error-text": "hsl(0 0% 100%)",
          "--warning-bg": "hsl(38 92% 50% / 0.9)",
          "--warning-text": "hsl(0 0% 0%)",
          "--info-bg": "hsl(221.2 83.2% 53.3% / 0.9)",
          "--info-text": "hsl(0 0% 100%)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-sm",
          success: "group-[.toaster]:border-green-500/30 group-[.toaster]:bg-green-500/10 group-[.toaster]:text-green-600 dark:group-[.toaster]:text-green-400",
          error: "group-[.toaster]:border-red-500/30 group-[.toaster]:bg-red-500/10 group-[.toaster]:text-red-600 dark:group-[.toaster]:text-red-400",
          warning: "group-[.toaster]:border-amber-500/30 group-[.toaster]:bg-amber-500/10 group-[.toaster]:text-amber-600 dark:group-[.toaster]:text-amber-400",
          info: "group-[.toaster]:border-blue-500/30 group-[.toaster]:bg-blue-500/10 group-[.toaster]:text-blue-600 dark:group-[.toaster]:text-blue-400",
          loading: "group-[.toaster]:border-gray-500/30 group-[.toaster]:bg-gray-500/10 group-[.toaster]:text-gray-600 dark:group-[.toaster]:text-gray-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
