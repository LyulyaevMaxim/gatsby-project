import React from 'react'
import { css } from '@emotion/core'
import * as NFieldLengthCSS  from './@types'

interface IInputState {
  value: string
  isValid: null | boolean
}

export const FieldInputLengthCSS: React.FC<NFieldLengthCSS.IFieldInputLengthCSS> = React.memo(props => {
  const [input, setInput] = React.useState<IInputState>({
      value: props.value,
      isValid: props.value ? patterns.correctInput.test(props.value) : null,
    }),
    inputOnChange = React.useCallback(event => {
      const elValue = event.target.value
      if (!elValue || patterns.similarInput.test(elValue))
        setInput(state => ({ ...state, value: elValue, isValid: null }))
    }, []),
    inputOnBlur = React.useCallback(event => {
      const elValue = event.target.value,
        matches = patterns.correctInput.exec(elValue)
      let newState = { isValid: elValue ? false : null, value: elValue }

      if (matches) {
        const { defaultValue, number, unit }: NFieldLengthCSS.IPatternCorrectInputByGroups = matches.groups || {}
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
      css={[styles.input, input.isValid !== null && input.value && styles[input.isValid ? 'valid' : 'invalid']]}
      data-is-valid={String(input.isValid)}
    />
  )
})

const styles = {
  input: css`
    border: 1px solid;
    &:focus {
      outline: none;
    }
  `,
  valid: css`
    border-color: green;
  `,
  invalid: css`
    border-color: red;
  `,
}

export const patterns = (() => {
  const defaultValues = `(?<defaultValue>${Object.keys(NFieldLengthCSS.defaultUnitsOfMeasure).join('|')})`,
    //similar to correct: 1, 1., 1.1, 1p, 1ppp
    numbersWithLetters = `[-]?\\d+((\\.?(\\d+[a-z%]*)?)|[a-z%]*)`,
    //only correct: 1, 1.1, 1px
    numbersWithUnits = `((?<number>[-]?(\\d*\\.)?\\d+)(?<unit>${Object.keys(NFieldLengthCSS.numericUnits).join('|')})?)`

  return {
    similarInput: new RegExp(`^([a-z]+|${numbersWithLetters})$`),
    correctInput: new RegExp(`^(${defaultValues}|${numbersWithUnits})$`),
  }
})()

export const examplesForInputPatterns = (() => {
  const someLengthKey = Object.keys(NFieldLengthCSS.unitsOfLengthMeasure)[0],
    someAdditionalKey = Object.keys(NFieldLengthCSS.additionalUnitsOfMeasure),
    someDefaultKey = Object.keys(NFieldLengthCSS.defaultUnitsOfMeasure)[0]
  return {
    validForInput: ['1.', '1', '1.1', '1p', '1ppp', '-1.11pxx', 'xs'],
    invalidForInput: ['a1', '1.x', `1${someLengthKey}1`, '-p'],
    validForSaving: ['1', '1.1', `1${someLengthKey}`, `-1.11${someAdditionalKey}`, someDefaultKey],
    invalidForSaving: [
      `${someDefaultKey}1`,
      `1.${someLengthKey}`,
      `1${someLengthKey}1`,
      '1.',
      '1p',
      `1${someLengthKey}${someLengthKey}`,
      `-${someDefaultKey}`,
      'nonExistKey',
    ],
  }
})()
