import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Menu, MenuItem } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='text-xs tabler-circle' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/admin' icon={<i className='tabler-dashboard' />}>
          Admin Dashboard
        </MenuItem>
        <MenuItem href='/admin/settings' icon={<i className='tabler-settings' />}>
          Admin Settings
        </MenuItem>
        <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
          About
        </MenuItem>
        <MenuItem href='/dosen' icon={<i className='tabler-user' />}>
          Dosen
        </MenuItem>
        <MenuItem href='/mahasiswa/dashboard' icon={<i className='tabler-dashboard' />}>
          Student Dashboard
        </MenuItem>
        <MenuItem href='/pengajuan' icon={<i className='tabler-file' />}>
          Submission
        </MenuItem>
        <MenuItem href='/laboratorium' icon={<i className='tabler-flask' />}>
          Laboratory Page
        </MenuItem>
        <MenuItem href='/admin/lab' icon={<i className='tabler-settings' />}>
          Lab Admin
        </MenuItem>
      </Menu >
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='text-xs tabler-circle' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper >
  )
}

export default VerticalMenu
