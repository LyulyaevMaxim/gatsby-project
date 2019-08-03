import './src/styles/global.css'
export { WithProvider as wrapRootElement } from './src/store/withProvider'
export { wrapPageElement } from './src/components/layout/index'

export const onClientEntry = () => {
  if (typeof window.IntersectionObserver === `undefined`) import(`intersection-observer`)
}
