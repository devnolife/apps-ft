'use client'

// React Imports
import { createContext, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// Third-party Imports
import classnames from 'classnames'
import { FloatingTree } from '@floating-ui/react'

// Hook Imports
import useVerticalNav from '../../hooks/useVerticalNav'

// Util Imports
import { menuClasses } from '../../utils/menuClasses'

// Styled Component Imports
import StyledVerticalMenu from '../../styles/vertical/StyledVerticalMenu'

// Style Imports
import styles from '../../styles/styles.module.css'

// Default Config Imports
import { verticalSubMenuToggleDuration } from '../../defaultConfigs'

export const VerticalMenuContext = createContext({})

const Menu = (props, ref) => {
  // Props
  const {
    children,
    className,
    rootStyles,
    menuItemStyles,
    renderExpandIcon,
    renderExpandedMenuItemIcon,
    menuSectionStyles,
    browserScroll = false,
    triggerPopout = 'hover',
    popoutWhenCollapsed = false,
    subMenuOpenBehavior = 'accordion', // accordion, collapse
    transitionDuration = verticalSubMenuToggleDuration,
    collapsedMenuSectionLabel = '-',
    popoutMenuOffset = { mainAxis: 0 },
    textTruncate = true,
    userRole, // New prop for user role
    ...rest
  } = props

  // States
  const [openSubmenu, setOpenSubmenu] = useState([])

  // Refs
  const openSubmenusRef = useRef([])

  // Hooks
  const pathname = usePathname()
  const { updateVerticalNavState } = useVerticalNav()

  const toggleOpenSubmenu = useCallback(
    (...submenus) => {
      if (!submenus.length) return
      const openSubmenuCopy = [...openSubmenu]

      submenus.forEach(({ level, label, active = false, id }) => {
        const submenuIndex = openSubmenuCopy.findIndex(submenu => submenu.id === id)
        const submenuExists = submenuIndex >= 0
        const isAccordion = subMenuOpenBehavior === 'accordion'
        const inactiveSubmenuIndex = openSubmenuCopy.findIndex(submenu => !submenu.active && submenu.level === 0)

        // Delete submenu if it exists
        if (submenuExists) {
          openSubmenuCopy.splice(submenuIndex, 1)
        }

        if (isAccordion) {
          // Add submenu if it doesn't exist
          if (!submenuExists) {
            if (inactiveSubmenuIndex >= 0 && !active && level === 0) {
              openSubmenuCopy.splice(inactiveSubmenuIndex, 1, { level, label, active, id })
            } else {
              openSubmenuCopy.push({ level, label, active, id })
            }
          }
        } else {
          // Add submenu if it doesn't exist
          if (!submenuExists) {
            openSubmenuCopy.push({ level, label, active, id })
          }
        }
      })
      setOpenSubmenu(openSubmenuCopy)
    },
    [openSubmenu, subMenuOpenBehavior]
  )

  useEffect(() => {
    setOpenSubmenu([...openSubmenusRef.current])
    openSubmenusRef.current = []
  }, [pathname])

  // UseEffect, update verticalNav state to set initial values and update values on change
  useEffect(() => {
    updateVerticalNavState({
      isPopoutWhenCollapsed: popoutWhenCollapsed
    })
  }, [popoutWhenCollapsed, updateVerticalNavState])

  const providerValue = useMemo(
    () => ({
      browserScroll,
      triggerPopout,
      transitionDuration,
      menuItemStyles,
      menuSectionStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      openSubmenu,
      openSubmenusRef,
      toggleOpenSubmenu,
      subMenuOpenBehavior,
      collapsedMenuSectionLabel,
      popoutMenuOffset,
      textTruncate
    }),
    [
      browserScroll,
      triggerPopout,
      transitionDuration,
      menuItemStyles,
      menuSectionStyles,
      renderExpandIcon,
      renderExpandedMenuItemIcon,
      openSubmenu,
      openSubmenusRef,
      toggleOpenSubmenu,
      subMenuOpenBehavior,
      collapsedMenuSectionLabel,
      popoutMenuOffset,
      textTruncate
    ]
  )

  const renderMenuForRole = (role) => {
    switch (role) {
      case 'admin':
        return (
          <ul className={styles.ul}>
            {/* Admin specific menu items */}
            {children}
          </ul>
        )
      case 'lecturer':
        return (
          <ul className={styles.ul}>
            {/* Lecturer specific menu items */}
            {children}
          </ul>
        )
      case 'dean':
        return (
          <ul className={styles.ul}>
            {/* Dean specific menu items */}
            {children}
          </ul>
        )
      case 'study_program':
        return (
          <ul className={styles.ul}>
            {/* Study Program specific menu items */}
            {children}
          </ul>
        )
      case 'lab':
        return (
          <ul className={styles.ul}>
            {/* Lab specific menu items */}
            {children}
          </ul>
        )
      default:
        return (
          <ul className={styles.ul}>
            {children}
          </ul>
        )
    }
  }

  return (
    <VerticalMenuContext.Provider value={providerValue}>
      <FloatingTree>
        <StyledVerticalMenu
          ref={ref}
          className={classnames(menuClasses.root, className)}
          rootStyles={rootStyles}
          {...rest}
        >
          {renderMenuForRole(userRole)}
        </StyledVerticalMenu>
      </FloatingTree>
    </VerticalMenuContext.Provider>
  )
}

export default forwardRef(Menu)
