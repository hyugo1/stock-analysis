"use client"
// components/ClientWatchlistTable.tsx
import { useEffect, useState } from "react"
import WatchlistTable from "./WatchlistTable"

interface Props {
  watchlistData: any[]
}

export default function ClientWatchlistTable({ watchlistData }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return <WatchlistTable watchlist={watchlistData} />
}