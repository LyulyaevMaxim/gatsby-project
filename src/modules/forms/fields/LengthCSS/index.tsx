import React from 'react'
import { getModuleAsync } from '../../../optimizations/index'

export const FieldLengthCSS = getModuleAsync({
  moduleName: 'FieldLengthCSS',
  moduleImport: () => import(/* webpackChunkName: "FieldLengthCSS", webpackPrefetch: true */ `./LengthCSS`),
})
