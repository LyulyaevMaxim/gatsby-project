import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from 'modules/optimizations'
import * as NFieldLengthCSS  from './@types'

export const FieldLengthCSS: LoadableComponent<NFieldLengthCSS.IFieldLengthCSS> = getModuleAsync({
  moduleName: 'FieldLengthCSS',
  moduleImport: () => import(/* webpackChunkName: "FieldLengthCSS", webpackPrefetch: true */ `./LengthCSS`),
})
