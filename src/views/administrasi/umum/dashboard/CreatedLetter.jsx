'use client'

import UserForm from '@components/UserForm'

const CreatedLetter = props => {
  const { open, handleClose, userData, setData } = props

  return (
    <UserForm open={open} handleClose={handleClose} userData={userData} setData={setData} />
  )
}

export default CreatedLetter
