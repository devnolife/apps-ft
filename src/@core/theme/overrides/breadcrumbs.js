const breadcrumbs = {
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        '& svg, & i': {
          fontSize: '1.25rem'
        },
        '& a': {
          textDecoration: 'none',
          color: 'var(--mui-palette-primary-main)'
        }
      },
      li: ({ theme }) => ({
        lineHeight: theme.typography.body1.lineHeight,
        '& > *:not(a)': {
          color: 'var(--mui-palette-text-primary)'
        }
      })
    }
  }
}

export default breadcrumbs
