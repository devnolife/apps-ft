const tablePagination = {
  MuiTablePagination: {
    styleOverrides: {
      toolbar: ({ theme }) => ({
        paddingInlineEnd: `${theme.spacing(3)} !important`
      }),
      select: {
        '& ~ i, & ~ svg': {
          right: '2px !important'
        }
      }
    }
  }
}

export default tablePagination
