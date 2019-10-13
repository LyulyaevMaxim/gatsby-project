import React from 'react'
import { css } from '@emotion/core'
import { get } from 'lodash'
import * as I from './types'
import { FieldInputLengthCSS, patterns } from './input'
import { FieldSelectLengthCSS } from './select'

//TODO: lazy load this module

export const FieldLengthCSS = (props: I.IFieldLengthCSS & IDefaultProps) => {
  const { 'menu-items': menuItems } = props,
    [state, setState] = React.useState(
      (() => {
        const { value } = props
        if (!value) return { value: '', unit: menuItems[0] }
        const { defaultValue, number, unit }: I.IPatternCorrectInputByGroups =
          get(patterns.correctInput.exec(value), 'groups') || {}
        return { value: number || defaultValue || value, unit: unit || menuItems[0] }
      })()
    ),
    prevState = React.useRef(state),
    setStateFromInput = React.useCallback(({ defaultValue, number, unit }: I.IPatternCorrectInputByGroups) => {
      setState(currentState => ({
        ...currentState,
        value: number || defaultValue || currentState.value,
        unit: (() => {
          if (unit) return unit
          if (defaultValue) return defaultValue as I.allUnits
          if (number && currentState.unit in I.defaultUnitsOfMeasure) {
            const numericOptions = Object.keys(I.numericUnits)
            return menuItems.find(option => numericOptions.includes(option)) as I.allUnits
          }
          return currentState.unit
        })(),
      }))
    }, []),
    setStateFromSelect = React.useCallback(({ unit }: { unit: I.allUnits }) => {
      setState(currentState => ({
        ...currentState,
        unit,
        value: (() => {
          if (unit in I.defaultUnitsOfMeasure) return unit
          if (unit in I.numericUnits && !+currentState.value) return ''
          return currentState.value
        })(),
      }))
    }, [])

  //state was updated
  React.useEffect(() => {
    if (prevState.current !== state) {
      prevState.current = state
      if (typeof props.onChange === 'function') props.onChange(state)
    }
  }, [state])

  return (
    <div css={styles.container}>
      <FieldInputLengthCSS value={state.value} setParentState={setStateFromInput} />
      <FieldSelectLengthCSS value={state.unit} menuItems={menuItems} setParentState={setStateFromSelect} />
    </div>
  )
}

interface IDefaultProps {
  ['menu-items']: Array<I.allUnits>
}

FieldLengthCSS.defaultProps = {
  'menu-items': Object.keys(I.allUnits),
} as IDefaultProps

const styles = {
  container: `
    display: flex;
    align-items: center;
  `,
}
