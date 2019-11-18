import React from 'react'
import { FieldLengthCSS } from 'modules/forms/fields/LengthCSS'
import * as NFieldLengthCSS from 'modules/forms/fields/LengthCSS/@types'

const props: NFieldLengthCSS.IFieldLengthCSS = {
  value: '20vw',
  'menu-items': ['auto', 'px', '%', 'rem'] as Array<NFieldLengthCSS.allUnits>,
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
