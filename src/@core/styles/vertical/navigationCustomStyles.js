// Util Imports
import { menuClasses, verticalNavClasses } from '@menu/utils/menuClasses'

const navigationCustomStyles = (verticalNavOptions, theme) => {
  // Vars
  const { collapsedWidth, isCollapsed, isHovered, transitionDuration } = verticalNavOptions
  const collapsedHovered = isCollapsed && isHovered
  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    color: 'var(--mui-palette-text-primary)',
    zIndex: 'var(--drawer-z-index) !important',
    [`& .${verticalNavClasses.header}`]: {
      paddingBlock: theme.spacing(5),
      paddingInline: theme.spacing(5.5, 4),
      ...(collapsedNotHovered && {
        paddingInline: theme.spacing((collapsedWidth - 35) / 8),
        '& a': {
          transform: `translateX(-${22 - (collapsedWidth - 29) / 2}px)`
        }
      }),
      '& a': {
        transition: `transform ${transitionDuration}ms ease`
      }
    },
    [`& .${verticalNavClasses.container}`]: {
      transition: theme.transitions.create(['inline-size', 'inset-inline-start', 'box-shadow'], {
        duration: transitionDuration,
        easing: 'ease-in-out'
      }),
      borderColor: 'transparent',
      boxShadow: 'var(--mui-customShadows-sm)',
      '[data-skin="bordered"] &': {
        boxShadow: 'none',
        ...(collapsedHovered && {
          boxShadow: 'var(--mui-customShadows-sm)'
        }),
        borderColor: 'var(--mui-palette-divider)'
      }
    },
    [`& .${menuClasses.root}`]: {
      paddingBlock: theme.spacing(1),
      paddingInline: theme.spacing(3)
    },
    [`& .${verticalNavClasses.backdrop}`]: {
      backgroundColor: 'var(--backdrop-color)'
    }
  }
}

export default navigationCustomStyles
