import { useEffect, useRef } from 'react'

export const usePolling = (callback, interval, enabled = true) => {
  const intervalRef = useRef(null)

  useEffect(() => {
    if (enabled && callback) {
      intervalRef.current = setInterval(callback, interval)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [callback, interval, enabled])

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startPolling = () => {
    if (!intervalRef.current && callback) {
      intervalRef.current = setInterval(callback, interval)
    }
  }

  return { stopPolling, startPolling }
}
