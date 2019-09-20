import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/core'
// import styled, { css as styledCSS } from 'styled-components'
import { Button } from '@material-ui/core'
import { Link } from 'modules/link'
import { useDispatch } from 'react-redux'
import { notificationAdd } from 'store/notifications/actions'
// import toastify, { toast } from 'react-toastify'

import { Layout } from 'components/layout'
import Image from 'components/image'

/*const StyledButton = styled.button`
  color: red ${props => props.primary && styledCSS`color: green;`};
`*/

export default function IndexPage() {
  const { t: tCommon } = useTranslation('common'),
    dispatch = useDispatch(),
    addNotification = React.useCallback(() => dispatch(notificationAdd({ message: 'text' })), [dispatch])

  return (
    <Layout>
      <h1>{tCommon('title')}</h1>
      <h3>{tCommon('text')}</h3>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/events/">Events</Link>
      <GatsbyLink to="./" hrefLang="en">
        English
      </GatsbyLink>
      <GatsbyLink to="/ru" hrefLang="ru">
        Russian
      </GatsbyLink>

      <Button
        onClick={addNotification}
        css={css`
          /*background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);*/
          border-radius: 3px;
          /*border: 0;
          color: white;*/
          height: 48px;
          padding: 0 30px;
          /*box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);*/
        `}
      >
        MUI + Emotion
      </Button>
      <button
        type="button"
        css={css`
          /*background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);*/
          border-radius: 3px;
          /*border: 0;*/
          /*color: white;*/
          height: 48px;
          padding: 0 30px;
          /*box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);*/
        `}
      >
        Only Emotion
      </button>

      <StyledButton primary children="Only Styled Components 5" />
    </Layout>
  )
}
