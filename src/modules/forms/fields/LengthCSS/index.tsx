import React from 'react'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from 'modules/optimizations'
import * as I from './types'

export const FieldLengthCSS: LoadableComponent<I.IFieldLengthCSS> = getModuleAsync({
  moduleName: 'FieldLengthCSS',
  moduleImport: () => import(/* webpackChunkName: "FieldLengthCSS", webpackPrefetch: true */ `./LengthCSS`),
})
