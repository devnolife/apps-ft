import React from 'react';

import Dashhboard from './Dashboard';
import Pendaftaran from './Pendaftaran';
import Confirmation from './Confirmation';
import PortalKKP from './PortalKKP';
import TimeLine from './TimeLine';

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
