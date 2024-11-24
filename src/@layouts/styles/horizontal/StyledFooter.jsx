// Third-party Imports
import styled from '@emotion/styled'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const StyledFooter = styled.footer`
  &.${horizontalLayoutClasses.footerFixed} {
    position: sticky;
    inset-block-end: 0;
    z-index: var(--footer-z-index);
    background-color: var(--mui-palette-background-paper);
    box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-lightShadow) / 0.14);
    [data-mui-color-scheme='dark'] & {
      box-shadow: 0 3px 12px 0px rgb(var(--mui-mainColorChannels-darkShadow) / 0.14);
    }
    [data-skin='bordered'] & {
      box-shadow: none;
      border-block-start: 1px solid var(--border-color);
    }
  }

  &.${horizontalLayoutClasses.footerContentCompact} .${horizontalLayoutClasses.footerContentWrapper} {
    margin-inline: auto;
    max-inline-size: ${themeConfig.compactContentWidth}px;
  }

  .${horizontalLayoutClasses.footerContentWrapper} {
    padding-block: 16px;
    padding-inline: ${themeConfig.layoutPadding}px;
  }

  ${({ overrideStyles }) => overrideStyles}
`

export default StyledFooter
