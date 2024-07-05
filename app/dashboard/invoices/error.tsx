"use client"

import React from "react"

export default function Error({ error, reset}: { error: Error, reset: () => void}) {

  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="w-full h-full flex items-center flex-col justify-center">
        <h2 className="text-center text-2xl font-semibold">Something went wrong</h2>
        <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400" onClick={reset}>Try again</button>
    </main>
  )
}
