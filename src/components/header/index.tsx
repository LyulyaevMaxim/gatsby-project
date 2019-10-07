import React from 'react'
import { Link, StaticQuery, useStaticQuery, graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import BackgroundImage, { IFluidObject } from 'gatsby-background-image'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import { AppBar, IconButton, Typography, Slide, useScrollTrigger, Menu, MenuItem } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useWindowScroll, useThrottleFn } from 'react-use'
import i18next from 'i18next'

interface IHeaderProps {}

interface IHeaderQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
  logoImage: {
    childImageSharp: {
      fluid: IFluidObject
    }
  }
}

export const Header: React.FC<IHeaderProps> = props => {
  const data: IHeaderQueryProps = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
      logoImage: file(relativePath: { eq: "gatsby-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return <PureHeader {...props} data={data} />
}

interface IHeader extends IHeaderProps {
  data: IHeaderQueryProps
}

export const PureHeader: React.FC<IHeader> = props => {
  const classes = useStyles(),
    [headerHeight, setHeaderHeight] = React.useState(0),
    headerRef = React.useRef<HTMLElement>(null),
    { title: siteTitle, /*description: siteDescription*/ } = props.data.site.siteMetadata,
    currentLanguage = i18next.language

  React.useEffect(() => {
    const header = headerRef.current
    if (header) setHeaderHeight(() => header.clientHeight)
  }, [])

  return (
    <header
      data-testid="header-container"
      className={classes.headerContainer}
      css={css`
        height: ${headerHeight}px;
      `}
    >
      <HideOnScroll headerHeight={headerHeight}>
        <AppBar data-testid="header-content" component="div" className={classes.header} ref={headerRef}>
          <TransitionLink data-testid="header-logo" to={`/${currentLanguage}`} className={classes.title}>
            <Img
              data-testid="header-logo-image" //don't set
              fluid={props.data.logoImage.childImageSharp.fluid}
              className={classes.logo}
            />
            <h2 data-testid="header-logo-title">{siteTitle}</h2>
          </TransitionLink>
          {/*<HeaderMenu />*/}

          {/*<h1>

        <Link
          to="/item/1"
          activeClassName="active"
          activeStyle={{ color: 'red' }}
          // partiallyActive
          state={{ fromBanner: true }}
        >
          {titleFromAPI}
        </Link>

      </h1>*/}
          {/* </BackgroundImage> */}
          {/*<p>This site was last built on: {props.data.site.buildTime}</p>*/}
        </AppBar>
      </HideOnScroll>
    </header>
  )
}

const useStyles = makeStyles(theme => ({
  headerContainer: {},
  header: {
    // position: 'sticky',
    // position: 'static',
    // display: 'grid',
    // gridTemplateColumns: 'max-content max-content',
    // gridGap: theme.spacing(2),
    // alignItems: 'center',
    // justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText
  },
  menuButton: {
    color: 'inherit',
    width: 'max-content',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    display: 'inline-grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(2,max-content)',
    gridGap: theme.spacing(1),

    '& > h2': theme.typography.h6,
    '&:hover > h2': {
      color: fade(theme.palette.common.white, 0.25),
    },
  },
  logo: {
    width: 50,
  },
}))

function HideOnScroll(props: { children: React.ReactNode; headerHeight: number }) {
  const { children, headerHeight } = props,
    { y } = useWindowScroll(),
    lastY = React.useRef(0)

  const needHideElement = value => {
      const isScrollOnTop = lastY.current < value,
        isEnoughScrollToBottom = value > 1.5 * headerHeight
      lastY.current = value
      return isScrollOnTop && isEnoughScrollToBottom
    },
    //onInWithThrottle = useThrottleFn(needHideElement, 300, [y]), //TODO: Jest error
    onIn = /*!process.env.IS_TESTS ? onInWithThrottle : */ needHideElement(y)

  return <Slide direction="down" appear={false} in={!onIn} children={children} />
}
