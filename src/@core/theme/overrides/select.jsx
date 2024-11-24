// React Imports
import React from 'react'

const SelectIcon = () => {
  return <i className='tabler-chevron-down' />
}

const iconStyles = theme => ({
  userSelect: 'none',
  display: 'inline-block',
  fill: 'currentColor',
  flexShrink: 0,
  transition: theme.transitions.create('fill', {
    duration: theme.transitions.duration.shorter
  }),
  fontSize: '1.25rem',
  position: 'absolute',
  right: '1rem',
  pointerEvents: 'none'
})

const select = {
  MuiSelect: {
    defaultProps: {
      IconComponent: SelectIcon
    },
    styleOverrides: {
      select: ({ theme, ownerState }) => ({
        ...(ownerState.variant === 'outlined' && {
          height: '1.5em'
        }),
        '&[aria-expanded="true"] ~ i, &[aria-expanded="true"] ~ svg': {
          transform: 'rotate(180deg)'
        },
        '& ~ i, & ~ svg': iconStyles(theme),
        '&.MuiInputBase-inputSizeSmall': {
          '& ~ i, & ~ svg': {
            height: '1.125rem',
            width: '1.125rem'
          }
        },
        '&:not(aria-label="Without label") ~ .MuiOutlinedInput-notchedOutline > legend > span': {
          paddingInline: '5px'
        }
      })
    }
  },
  MuiNativeSelect: {
    styleOverrides: {
      select: ({ theme }) => ({
        '& + i, & + svg': iconStyles(theme)
      })
    }
  }
}

export default select
