import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { FieldLengthCSS } from '../index'
import { FieldInputLengthCSS, patterns, examplesForInputPatterns } from '../input'
import { FieldSelectLengthCSS } from '../select'
import * as I from '../types'

const keysUnitsOfMeasure = {
  default: Object.keys(I.defaultUnitsOfMeasure),
  length: Object.keys(I.unitsOfLengthMeasure),
  additional: Object.keys(I.additionalUnitsOfMeasure),
}

describe('FieldLengthCSS', () => {
  const menuItems = ['auto', 'px', '%', 'rem'] as Array<I.allUnits>,
    someNumber = '-12.678',
    someDefaultValue = keysUnitsOfMeasure.default[0],
    someLengthValue = keysUnitsOfMeasure.length[0]

  it('renders correctly', () => {
    const Field = render(<FieldLengthCSS menu-items={menuItems} value="20vw" />)
    expect(Field.asFragment()).toMatchSnapshot()
  })

  it(`props "menu-items" must change amount displaying options select`, () => {
    const Field = render(<FieldLengthCSS />)
    expect(Field.getByTestId('field-lengthCSS-select').children.length).toBe(Object.keys(I.allUnits).length)

    Field.rerender(<FieldLengthCSS menu-items={menuItems} />)
    expect(Field.getByTestId('field-lengthCSS-select').children.length).toBe(menuItems.length)
  })

  it(`"input" and "select" must correctly influence each other`, () => {
    const Field = render(<FieldLengthCSS value={someDefaultValue} menu-items={menuItems} />)

    /* when was input <number> then "defaultValue" of select must be replaced
       to the first numeric unit of measure from 'menuItems' */
    expect((Field.getByTestId('field-lengthCSS-select') as any).value).toBe(someDefaultValue)
    fireEvent.blur(Field.getByTestId('field-lengthCSS-input'), {
      target: { value: someNumber },
    })
    expect((Field.getByTestId('field-lengthCSS-select') as any).value).toBe(
      menuItems.find(option => Object.keys(I.numericUnits).includes(option))
    )

    /* when was input <number><unit of measure> then the input must be replaced 
       to <number> and the select to <unit> */
    Field.rerender(<FieldLengthCSS menu-items={menuItems} />)
    fireEvent.blur(Field.getByTestId('field-lengthCSS-input'), {
      target: { value: `${someNumber}${someLengthValue}` },
    })
    expect((Field.getByTestId('field-lengthCSS-input') as any).value).toBe(someNumber)
    expect((Field.getByTestId('field-lengthCSS-select') as any).value).toBe(someLengthValue)

    // when was input <default value> then the select must be replaced to this default value too
    Field.rerender(<FieldLengthCSS menu-items={menuItems} />)
    fireEvent.blur(Field.getByTestId('field-lengthCSS-input'), {
      target: { value: someDefaultValue },
    })
    expect((Field.getByTestId('field-lengthCSS-input') as any).value).toBe(someDefaultValue)
    expect((Field.getByTestId('field-lengthCSS-select') as any).value).toBe(someDefaultValue)

    // when select was set to <default value> and input had a non default value then input will set default value too
    Field.rerender(<FieldLengthCSS menu-items={menuItems} value={someNumber} />)
    fireEvent.change(Field.getByTestId("field-lengthCSS-select"), { target: { value: someDefaultValue } })
    expect((Field.getByTestId('field-lengthCSS-input') as any).value).toBe(someDefaultValue)

    // when select was set to <numeric value> and input has a default value then input will reset
    Field.rerender(<FieldLengthCSS menu-items={menuItems} value={someDefaultValue} />)
    fireEvent.change(Field.getByTestId("field-lengthCSS-select"), { target: { value: 'px' } })
    expect((Field.getByTestId('field-lengthCSS-input') as any).value).toBe('')
  })
})


describe('FieldInputLengthCSS', () => {
  it('when input value must be invalid or valid', () => {
    const Input = render(<FieldInputLengthCSS value="" />)
    expect(Input.getByTestId('field-lengthCSS-input').dataset.isValid).toBeUndefined()
    ;[
      { newInputValue: examplesForInputPatterns.invalidForInput[0], toBeValue: 'false' },
      { newInputValue: examplesForInputPatterns.validForInput[0], toBeValue: 'true' },
    ].forEach(({ newInputValue, toBeValue }) => {
      fireEvent.input(Input.getByTestId('field-lengthCSS-input'), {
        target: { value: newInputValue },
      })
      expect(Input.getByTestId('field-lengthCSS-input').dataset.isValid).toBe(toBeValue)
    })
  })

  it('when saving value must be invalid or valid', () => {
    const Input = render(<FieldInputLengthCSS value="" />)
    expect(Input.getByTestId('field-lengthCSS-input').dataset.isValid).toBeUndefined()
    ;[
      { newInputValue: examplesForInputPatterns.invalidForSaving[0], toBeValue: 'false' },
      { newInputValue: examplesForInputPatterns.validForSaving[0], toBeValue: 'true' },
    ].forEach(({ newInputValue, toBeValue }) => {
      fireEvent.blur(Input.getByTestId('field-lengthCSS-input'), {
        target: { value: newInputValue },
      })
      expect(Input.getByTestId('field-lengthCSS-input').dataset.isValid).toBe(toBeValue)
    })
  })
})


describe('Input patterns', () => {
  const { similarInput, correctInput } = patterns

  it('valid data at the time of input', () =>
    examplesForInputPatterns.validForInput.forEach(inputtedValue =>
      expect(similarInput.test(inputtedValue)).toBeTruthy()
    ))

  it('invalid data at the time of input', () =>
    examplesForInputPatterns.invalidForInput.forEach(inputtedValue =>
      expect(similarInput.test(inputtedValue)).toBeFalsy()
    ))

  it('valid data at the time of saving', () =>
    examplesForInputPatterns.validForSaving.forEach(inputtedValue =>
      expect(correctInput.test(inputtedValue)).toBeTruthy()
    ))

  it('invalid data at the time of saving', () =>
    examplesForInputPatterns.invalidForSaving.forEach(inputtedValue =>
      expect(correctInput.test(inputtedValue)).toBeFalsy()
    ))
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
