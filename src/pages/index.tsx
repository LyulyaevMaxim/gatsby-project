import React from 'react'
import { FieldLengthCSS } from '../modules/forms/fields/LengthCSS'
import * as IFieldLengthCSS from '../modules/forms/fields/LengthCSS/index.d'

const props = {
  value: '20vw',
  'menu-items': ['px', '%', 'rem', 'auto'] as Array<IFieldLengthCSS.allUnits>,
  onChange: newValue => console.log('to parent component', newValue),
}

export default function IndexPage() {
  return (
    <>
      <h1>Title</h1>
      <FieldLengthCSS {...props} />
    </>
  )
}
