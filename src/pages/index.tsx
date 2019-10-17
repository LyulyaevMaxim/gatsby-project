import React from 'react'
import { FieldLengthCSS } from '../modules/forms/fields/LengthCSS'
import * as IFieldLengthCSS from '../modules/forms/fields/LengthCSS/types'

const props = {
  value: '20vw',
  'menu-items': ['auto', 'px', '%', 'rem'] as Array<IFieldLengthCSS.allUnits>,
  onChange: newValue => console.log('to parent component', newValue),
}

export default function IndexPage() {
  return (
    <>
      <h1>Title</h1>
      <FieldLengthCSS {...props} fallback={<div>Custom Loading...</div>} />
    </>
  )
}
