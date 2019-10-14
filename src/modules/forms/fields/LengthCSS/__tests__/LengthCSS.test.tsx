import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { FieldLengthCSS } from '../index'
import { FieldInputLengthCSS, patterns } from '../input'
import { FieldSelectLengthCSS } from '../select'
import * as I from '../types'

const keysUnitsOfMeasure = {
  default: Object.keys(I.defaultUnitsOfMeasure),
  length: Object.keys(I.unitsOfLengthMeasure),
  additional: Object.keys(I.additionalUnitsOfMeasure),
}

describe('FieldLengthCSS', () => {
  it('renders correctly', () => {
    // const Field = render(<FieldLengthCSS  />)
  })
})

/*describe('FieldInputLengthCSS', () => {
  it('must be invalid when has incorrect value', () => {
    const Input = render(<FieldInputLengthCSS value="" />)
  })
})*/


describe('Input patterns', () => {
  const { similarInput, correctInput } = patterns,
    someLengthKey = keysUnitsOfMeasure.length[0],
    someAdditionalKey = keysUnitsOfMeasure.additional[0],
    someDefaultKey = keysUnitsOfMeasure.default[0]

  it('valid data at the time of input', () =>
    ['1', '1.', '1.1', '1p', '1ppp', '-1.11pxx', 'xs'].forEach(inputtedValue =>
      expect(similarInput.test(inputtedValue)).toBeTruthy()
    ))

  it('invalid data at the time of input', () =>
    ['a1', '1.x', `1${someLengthKey}1`, '-p'].forEach(inputtedValue =>
      expect(similarInput.test(inputtedValue)).toBeFalsy()
    ))

  it('valid data at the time of saving', () =>
    ['1', '1.1', `1${someLengthKey}`, `-1.11${someAdditionalKey}`, someDefaultKey].forEach(inputtedValue =>
      expect(correctInput.test(inputtedValue)).toBeTruthy()
    ))

  it('invalid data at the time of saving', () =>
    [
      `${someDefaultKey}1`,
      `1.${someLengthKey}`,
      `1${someLengthKey}1`,
      '1.',
      '1p',
      `1${someLengthKey}${someLengthKey}`,
      `-${someDefaultKey}`,
      'nonExistKey',
    ].forEach(inputtedValue => expect(correctInput.test(inputtedValue)).toBeFalsy()))
})

describe('FieldSelectLengthCSS', () => {
  const createSelect = props => render(<FieldSelectLengthCSS {...props} />),
    menuItems = [keysUnitsOfMeasure.length[0], keysUnitsOfMeasure.default[0]] as Array<I.allUnits>,
    nonExistValue = keysUnitsOfMeasure.additional[0] as I.allUnits,
    getSelectOptions = ({ container }) => container.getElementsByTagName('option')

  it(`if 'value' does not include in 'menuItems' then it added in options select`, () => {
    const { container } = createSelect({ menuItems, value: nonExistValue }),
      selectOptions = getSelectOptions({ container })
    expect(selectOptions.length).toBe(menuItems.length + 1)
    expect([...selectOptions].map(({ value }) => value).includes(nonExistValue)).toBeTruthy()
  })

  it(`when 'value', which not includes in 'menuItems' change to any other, then the previous value delete from options select`, async () => {
    const { container, rerender } = createSelect({ menuItems, value: nonExistValue })
    expect(getSelectOptions({ container }).length).toBe(menuItems.length + 1)
    // fireEvent.change(getByTestId("field-lengthCSS-select"), { target: { value: "px" } })
    rerender(<FieldSelectLengthCSS {...{ menuItems, value: menuItems[0] }} />)
    expect(getSelectOptions({ container }).length).toBe(menuItems.length)
  })

  it(`when change to value, which not includes in 'menuItems' this value add in options select`, async () => {
    const { container, rerender } = createSelect({ menuItems, value: menuItems[0] })
    expect(getSelectOptions({ container }).length).toBe(menuItems.length)
    rerender(<FieldSelectLengthCSS {...{ menuItems, value: nonExistValue }} />)
    expect(getSelectOptions({ container }).length).toBe(menuItems.length + 1)
  })
})
