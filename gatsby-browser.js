/* https://www.gatsbyjs.org/docs/browser-apis/ */
import 'styles/global.css'

export { WithProvider as wrapRootElement } from 'store/withProvider'
export { wrapPageElement } from 'components/layout'

export const onClientEntry = () => {
  if (typeof window.IntersectionObserver === `undefined`) import(`intersection-observer`)
  // callAnalyticsAPI()
}

export const onInitialClientRender = () => {}
