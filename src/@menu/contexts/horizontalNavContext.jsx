'use client'

// React Imports
import { createContext, useMemo, useState } from 'react'

const HorizontalNavContext = createContext({})

export const HorizontalNavProvider = ({ children }) => {
  // States
  const [isBreakpointReached, setIsBreakpointReached] = useState(false)

  // update isBreakpointReached value
  const updateIsBreakpointReached = isBreakpointReached => {
    setIsBreakpointReached(isBreakpointReached)
  }

  // Hooks
  const HorizontalNavProviderValue = useMemo(
    () => ({
      isBreakpointReached,
      updateIsBreakpointReached
    }),
    [isBreakpointReached]
  )

  return <HorizontalNavContext.Provider value={HorizontalNavProviderValue}>{children}</HorizontalNavContext.Provider>
}

export default HorizontalNavContext
