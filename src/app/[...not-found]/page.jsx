import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  const direction = 'ltr'
  const mode = getServerMode()
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
