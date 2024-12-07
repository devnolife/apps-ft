import React from 'react';


import Dashhboard from './Dashboard';
import Pendaftaran from './Pendaftaran';
import Confirmation from './Confirmation';

const statusKpp = false;
const konfirmasi = true
const Page = async () => {
  return (
    statusKpp ? (
      <Dashhboard />
    ) : (
      konfirmasi ? (
        <Confirmation />
      ) : (
        < Pendaftaran />
      )
    )
  )
}


export default Page
