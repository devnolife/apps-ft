const menuRootStyles = theme => {
  return {
    '& > ul > li:not(:last-of-type)': {
      marginInlineEnd: theme.spacing(1.5)
    }
  }
}

export default menuRootStyles
