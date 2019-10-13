import React from 'react'
import * as I from './types'

interface IInputState {
  value: string
  isValid: null | boolean
}

export const FieldInputLengthCSS: React.FC<I.IFieldInputLengthCSS> = React.memo(props => {
  const [input, setInput] = React.useState<IInputState>({
      value: props.value,
      isValid: props.value ? patterns.correctInput.test(props.value) : null,
    }),
    inputOnChange = React.useCallback(event => {
      const elValue = event.target.value
      setInput(state => ({ ...state, value: elValue, isValid: patterns.similarInput.test(elValue) }))
    }, []),
    inputOnBlur = React.useCallback(event => {
      const elValue = event.target.value,
        matches = patterns.correctInput.exec(elValue)
      let newState = { isValid: false, value: elValue }

      if (matches) {
        const { defaultValue, number, unit }: I.IPatternCorrectInputByGroups = matches.groups || {}
        newState = { isValid: true, value: number || defaultValue }
        if (typeof props.setParentState === 'function') props.setParentState({ defaultValue, number, unit })
      }
      setInput(state => ({ ...state, ...newState }))
    }, [])

  //prop 'value' was updated
  React.useEffect(() => {
    if (props.value !== input.value) setInput(state => ({ ...state, isValid: true, value: props.value }))
  }, [props.value])

  return (
    <input
      data-testid="field-lengthCSS-input"
      value={input.value}
      onChange={inputOnChange}
      onBlur={inputOnBlur}
      type="text"
      css={[styles.input, input.value && styles[input.isValid ? 'valid' : 'invalid']]}
    />
  )
})

const styles = {
  input: `
    border: 1px solid;
    &:focus {
      outline: none;
    }
  `,
  valid: `
    border-color: green;
  `,
  invalid: `
    border-color: red;
  `,
}

export const patterns = (() => {
  const defaultValues = `(?<defaultValue>${Object.keys(I.defaultUnitsOfMeasure).join('|')})`,
    //similar to correct: 1, 1., 1.1, 1p, 1ppp
    numbersWithLetters = `[-]?\\d+((\\.?(\\d+[a-z%]*)?)|[a-z%]*)`,
    //only correct: 1, 1.1, 1px
    numbersWithUnits = `((?<number>[-]?(\\d*\\.)?\\d+)(?<unit>${Object.keys(I.numericUnits).join('|')})?)`

  return {
    similarInput: new RegExp(`^([a-z]+|${numbersWithLetters})$`),
    correctInput: new RegExp(`^(${defaultValues}|${numbersWithUnits})$`),
  }
})()
