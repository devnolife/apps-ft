const menu = skin => ({
  MuiMenu: {
    defaultProps: {
      ...(skin === 'bordered' && {
        slotProps: {
          paper: {
            elevation: 0
          }
        }
      })
    },
    styleOverrides: {
      paper: ({ theme }) => ({
        marginBlockStart: theme.spacing(0.5),
        ...(skin !== 'bordered' && {
          boxShadow: 'var(--mui-customShadows-lg)'
        })
      })
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingBlock: theme.spacing(2),
        gap: theme.spacing(2),
        color: 'var(--mui-palette-text-primary)',
        marginInline: theme.spacing(2),
        borderRadius: 'var(--mui-shape-borderRadius)',
        '& i, & svg': {
          fontSize: '1.375rem'
        },
        '& .MuiListItemIcon-root': {
          minInlineSize: 0
        },
        '&:not(:last-of-type)': {
          marginBlockEnd: theme.spacing(0.5)
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
          color: 'var(--mui-palette-primary-main)',
          '& .MuiListItemIcon-root': {
            color: 'var(--mui-palette-primary-main)'
          },
          '&:hover, &.Mui-focused, &.Mui-focusVisible': {
            backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
          }
        },
        '&.Mui-disabled': {
          color: 'var(--mui-palette-text-disabled)',
          opacity: 0.45
        }
      })
    }
  }
})

export default menu
