import React from 'react';

import PortalKKP from './PortalKKP';

const statusKpp = false;
const konfirmasi = true

const Page = async () => {
  return (
    statusKpp ? (
      <PortalKKP />
    ) : (
      konfirmasi ? (
        <PortalKKP />
      ) : (
        < PortalKKP />
      )
    )
  )
}


export default Page
