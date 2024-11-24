// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

const Layout = ({ children }) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
