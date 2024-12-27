import React from 'react'
import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import themeConfig from '@configs/themeConfig'
import AppReactToastify from '@/libs/styles/AppReactToastify'
import { getDemoName, getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
const Providers = props => {
  const { children, direction } = props
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const demoName = getDemoName()
  const systemMode = getSystemMode()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          {children}
          <AppReactToastify position={themeConfig.toastPosition} hideProgressBar />
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
