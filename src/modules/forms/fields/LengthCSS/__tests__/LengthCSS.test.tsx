import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
// import cases from "jest-in-case";
import { createSelectInterface } from 'modules/forms/select/testsHelper'
import * as NFieldLengthCSS from '../@types'
import { FieldLengthCSS } from '../index'
import { FieldInputLengthCSS, patterns, examplesForInputPatterns } from '../input'
import { FieldSelectLengthCSS } from '../select'

jest.mock('../index', () => require('../LengthCSS'))

const keysUnitsOfMeasure = {
    //TODO: way getting keys and values need to combine
    default: Object.keys(NFieldLengthCSS.defaultUnitsOfMeasure),
    length: Object.keys(NFieldLengthCSS.unitsOfLengthMeasure),
    additional: Object.keys(NFieldLengthCSS.additionalUnitsOfMeasure),
  },
  valuesUnitsOfMeasure = {
    default: Object.values(NFieldLengthCSS.defaultUnitsOfMeasure),
    length: Object.values(NFieldLengthCSS.unitsOfLengthMeasure),
    additional: Object.values(NFieldLengthCSS.additionalUnitsOfMeasure),
  }

describe('FieldLengthCSS', () => {
  const menuItems = ['auto', 'px', '%', 'rem'] as Array<NFieldLengthCSS.allUnits>,
    someNumber = '-12.678',
    someDefaultValue = {
      key: keysUnitsOfMeasure.default[0],
      value: valuesUnitsOfMeasure.default[0], //NFieldLengthCSS.defaultUnitsOfMeasure[keysUnitsOfMeasure.default[0]]
    },
    someLengthValue = keysUnitsOfMeasure.length[0]

  it('renders correctly', () => {
    const Field = render(<FieldLengthCSS menu-items={menuItems} value="20vw" />)
    expect(Field.asFragment()).toMatchSnapshot()
  })

  it(`props "menu-items" must change amount displaying options select`, async () => {
    const Field = render(<FieldLengthCSS />),
      Select = createSelectInterface({ container: Field.container })
    expect(Select.options.length).toBe(Object.keys(NFieldLengthCSS.allUnits).length)
    Field.rerender(<FieldLengthCSS menu-items={menuItems} />)
    expect(Select.options.length).toBe(menuItems.length)
  })

  it(`"input" and "select" must correctly influence each other`, () => {
    const Field = render(<FieldLengthCSS value={someDefaultValue.key} menu-items={menuItems} />),
      Select = createSelectInterface({ container: Field.container }),
      Input = createInputInterface({ Field })

    /* when was input <number> then "defaultValue" of select must be replaced
       to the first numeric unit of measure from 'menuItems' */
    expect(Select.value).toBe(someDefaultValue.key)
    Input.changeOnBlur(someNumber)
    expect(Select.value).toBe(menuItems.find(option => Object.keys(NFieldLengthCSS.numericUnits).includes(option)))

    /* when was input <number><unit of measure> then the input must be replaced
       to <number> and the select to <unit> */
    Field.rerender(<FieldLengthCSS menu-items={menuItems} />)
    Input.changeOnBlur(`${someNumber}${someLengthValue}`)
    expect(Input.value).toBe(someNumber)
    expect(Select.value).toBe(someLengthValue)

    // when was input <default value> then the select must be replaced to this default value too
    Field.rerender(<FieldLengthCSS menu-items={menuItems} />)
    Input.changeOnBlur(someDefaultValue.key)
    expect(Input.value).toBe(someDefaultValue.key)
    expect(Select.value).toBe(someDefaultValue.key)

    // when select was set to <default value> and input had a non default value then input will set default value too
    Field.rerender(<FieldLengthCSS menu-items={menuItems} value={someNumber} />)
    Select.changeOption(someDefaultValue.value)
    expect(Input.value).toBe(someDefaultValue.key)

    // when select was set to <numeric value> and input has a default value then input will reset
    Field.rerender(<FieldLengthCSS menu-items={menuItems} value={someDefaultValue.key} />)
    Select.changeOption('px') //TODO: need get menuItems element which in valuesUnitsOfMeasure.length
    expect(Input.value).toBe('')
  })
})

describe('FieldInputLengthCSS', () => {
  it('during input need reset validation status and only valid value must be pass', () => {
    const Input = createInputInterface({ Field: render(<FieldInputLengthCSS value="" />) })
    expect(Input.isValid).toBe('null')
    ;[
      { newInputValue: examplesForInputPatterns.invalidForInput[0], toBeValue: '' },
      {
        newInputValue: examplesForInputPatterns.validForInput[0],
        toBeValue: examplesForInputPatterns.validForInput[0],
      },
    ].forEach(({ newInputValue, toBeValue }) => {
      Input.changeOnInput(newInputValue)
      expect(Input.value).toBe(toBeValue)
      expect(Input.isValid).toBe('null')
    })
  })

  it('when saving value must be invalid or valid', () => {
    const Input = createInputInterface({ Field: render(<FieldInputLengthCSS value="" />) })
    expect(Input.isValid).toBe('null')
    ;[
      { newInputValue: examplesForInputPatterns.invalidForSaving[0], toBeValue: 'false' },
      { newInputValue: examplesForInputPatterns.validForSaving[0], toBeValue: 'true' },
    ].forEach(({ newInputValue, toBeValue }) => {
      Input.changeOnBlur(newInputValue)
      expect(Input.isValid).toBe(toBeValue)
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
  const createSelect = (props: NFieldLengthCSS.IFieldSelectLengthCSS) => render(<FieldSelectLengthCSS {...props} />),
    menuItems = [keysUnitsOfMeasure.length[0], keysUnitsOfMeasure.default[0]] as Array<NFieldLengthCSS.allUnits>,
    nonExistValue = keysUnitsOfMeasure.additional[0] as NFieldLengthCSS.allUnits

  it(`if 'value' does not include in 'menuItems' then it added in options select`, () => {
    const Select = createSelectInterface({ container: createSelect({ menuItems, value: nonExistValue }).container })
    expect(Select.options.length).toBe(menuItems.length + 1)
    expect([...Select.options].map(option => option.textContent).includes(nonExistValue)).toBeTruthy()
  })

  it(`when 'value', which not includes in 'menuItems' change to any other, then the previous value delete from options select`, async () => {
    const Field = createSelect({ menuItems, value: nonExistValue }),
      Select = createSelectInterface({ container: Field.container })
    expect(Select.options.length).toBe(menuItems.length + 1)
    Field.rerender(<FieldSelectLengthCSS {...{ menuItems, value: menuItems[0] }} />)
    expect(Select.options.length).toBe(menuItems.length)
  })

  it(`when change to value, which not includes in 'menuItems' this value add in options select`, async () => {
    const Field = createSelect({ menuItems, value: menuItems[0] }),
      Select = createSelectInterface({ container: Field.container })

    expect(Select.options.length).toBe(menuItems.length)
    Field.rerender(<FieldSelectLengthCSS {...{ menuItems, value: nonExistValue }} />)
    expect(Select.options.length).toBe(menuItems.length + 1)
  })
})

interface ICreateInputInterface {
  Field: RenderResult
}

function createInputInterface({ Field }: ICreateInputInterface) {
  return {
    get self() {
      return Field.getByTestId('field-lengthCSS-input') as any
    },
    get value() {
      return this.self.value
    },
    get isValid() {
      return this.self.dataset.isValid
    },
    changeOnBlur(newInputValue: string) {
      fireEvent.blur(this.self, { target: { value: newInputValue } })
    },
    changeOnInput(newInputValue: string) {
      fireEvent.input(this.self, { target: { value: newInputValue } })
    },
  }
}
