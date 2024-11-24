// Next Imports
import { cookies } from 'next/headers'

// Third-party Imports
import 'server-only'

// Config Imports
import themeConfig from '@configs/themeConfig'

export const getSettingsFromCookie = () => {
  const cookieStore = cookies()
  const cookieName = themeConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = () => {
  const settingsCookie = getSettingsFromCookie()

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || themeConfig.mode

  return _mode
}

export const getSystemMode = () => {
  const cookieStore = cookies()
  const mode = getMode()
  const colorPrefCookie = cookieStore.get('colorPref')?.value || 'light'

  return (mode === 'system' ? colorPrefCookie : mode) || 'light'
}

export const getServerMode = () => {
  const mode = getMode()
  const systemMode = getSystemMode()

  return mode === 'system' ? systemMode : mode
}

export const getSkin = () => {
  const settingsCookie = getSettingsFromCookie()

  return settingsCookie.skin || 'default'
}
