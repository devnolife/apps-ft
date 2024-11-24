'use client'

// React Imports
import React from 'react'

// Mui Imports
import MuiChip from '@mui/material/Chip'
import { styled } from '@mui/material'

const Chip = styled(MuiChip)(({ round }) => {
  return {
    ...(round === 'true' && {
      borderRadius: 500
    })
  }
})

const CustomChip = props => <Chip {...props} />

export default CustomChip
