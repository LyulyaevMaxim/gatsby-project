import React from 'react'
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import { timeout as pTimeout } from 'promise-timeout'

interface IGetAsyncModule {
  moduleImport: any
  moduleName?: string
  minDelay?: number
  maxTimeout?: number
  withPreload?: boolean
  withSSR?: boolean
}

export function getModuleAsync({
  moduleName = 'default',
  moduleImport,
  minDelay = 300,
  maxTimeout = 3000,
  withPreload = false,
  withSSR = true,
}: IGetAsyncModule) {
  const AsyncComponent = loadable(
    componentProps => {
      const getModule = async () => ((await pMinDelay(moduleImport(componentProps), minDelay)) as any)[moduleName]
      return pTimeout(getModule(), maxTimeout).catch(() => () => {
        const [Component, setComponent] = React.useState(),
          onClick = React.useCallback(async () => setComponent(await getModuleAsync(arguments[0])), [])
        //TODO: i18n
        return !Component ? <button onClick={onClick}>Something went wrong... click to reload</button> : <Component />
      })
    },
    {
      fallback: <Loader />,
    }
  )

  if (withPreload) AsyncComponent.preload()

  return AsyncComponent
}

const Loader: React.FC = () => {
  return <div>Loading...</div>
}
