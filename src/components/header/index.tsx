import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import { css } from '@emotion/core'
import { AppBar, IconButton, Typography, Slide, useScrollTrigger, Menu, MenuItem } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Menu as MenuIcon } from '@material-ui/icons'
// import styled from '@emotion/styled'
// import styles from './index.module.css'
// import BackgroundImage from 'gatsby-background-image'

// console.log(obj?.foo?.bar?.baz)

const useStyles = makeStyles(theme => ({
  header: {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content',
    gridGap: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
  menuButton: {
    color: 'inherit',
    width: 'max-content',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    '&:hover': {
      color: fade(theme.palette.common.white, 0.25),
    },
  },
}))

const styles = {
  header: css`
    /*padding: 1.5rem 1rem;*/
  `,
}

interface IHeaderProps {
}

interface IStaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      // description: string
    }
    buildTime: string
  }
  desktop: any
}

interface IHeader extends IHeaderProps {
  data: IStaticQueryProps
}

export const Header: React.FC<IHeaderProps> = props => {
  const render = React.useCallback((data: IStaticQueryProps) => <PureHeader {...props} data={data} />, [props])
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
            buildTime(formatString: "DD/MM/YYYY")
          }
          desktop: file(relativePath: { eq: "gatsby-astronaut.png" }) {
            childImageSharp {
              fluid(quality: 100, maxWidth: 4160) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={render}
    />
  )
}

export const PureHeader: React.FC<IHeader> = props => {
  const classes = useStyles(),
    titleFromAPI = props.data.site.siteMetadata.title

  return (
    <HideOnScroll>
      <AppBar data-test-id="header" className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          {titleFromAPI}
        </Typography>

        <HeaderMenu />
        {/* <BackgroundImage Tag="nav" css={nav} fluid={data.desktop.childImageSharp.fluid}> */}
        {/*<h1>
        <Link to="/">{siteTitle}</Link>
        <TransitionLink to="/404">404</TransitionLink>
        <Link
          to="/item/1"
          activeClassName="active"
          activeStyle={{ color: 'red' }}
          // partiallyActive
          state={{ fromBanner: true }}
        >
          {titleFromAPI}
        </Link>
        <Link to="/confirmation/" replace>
          Yes, I’m sure
        </Link>
      </h1>*/}
        {/* </BackgroundImage> */}
        {/*<p>This site was last built on: {props.data.site.buildTime}</p>*/}
      </AppBar>
    </HideOnScroll>
  )
}

function HideOnScroll(props : {children: React.ReactNode}) {
  const { children } = props,
    trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function HeaderMenu() {
  const classes = useStyles(),
    [anchorEl, setAnchorEl] = React.useState(null)

  return (
    <>
      <IconButton className={classes.menuButton} onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        // keepMounted
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Item 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Item 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Item 3</MenuItem>
      </Menu>
    </>
  )

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }
}
