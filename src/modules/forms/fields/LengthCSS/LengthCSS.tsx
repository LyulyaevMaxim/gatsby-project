import React from 'react'
import { css } from '@emotion/core'
import { get } from 'lodash'
import { hot } from 'react-hot-loader/root'
import * as NFieldLengthCSS from './@types'
import { FieldInputLengthCSS, patterns } from './input'
import { FieldSelectLengthCSS } from './select'

const FieldLengthCSS = (props: NFieldLengthCSS.IFieldLengthCSS & IDefaultProps) => {
  const { 'menu-items': menuItems } = props,
    [state, setState] = React.useState(
      (() => {
        const { value } = props
        if (!value) return { value: '', unit: menuItems[0] }
        const { defaultValue, number, unit }: NFieldLengthCSS.IPatternCorrectInputByGroups =
          get(patterns.correctInput.exec(value), 'groups') || {}
        // patterns.correctInput.exec(value)?.groups ?? {}
        return { value: number || defaultValue || value, unit: unit || menuItems[0] }
      })()
    ),
    prevState = React.useRef(state),
    setStateFromInput = React.useCallback(
      ({ defaultValue, number, unit }: NFieldLengthCSS.IPatternCorrectInputByGroups) => {
        setState(currentState => ({
          ...currentState,
          value: number || defaultValue || currentState.value,
          unit: (() => {
            if (unit) return unit
            if (defaultValue) return defaultValue as NFieldLengthCSS.allUnits
            if (number && currentState.unit in NFieldLengthCSS.defaultUnitsOfMeasure) {
              const numericOptions = Object.keys(NFieldLengthCSS.numericUnits)
              return menuItems.find(option => numericOptions.includes(option)) as NFieldLengthCSS.allUnits
            }
            return currentState.unit
          })(),
        }))
      },
      []
    ),
    setStateFromSelect = React.useCallback(({ unit }: { unit: NFieldLengthCSS.allUnits }) => {
      setState(currentState => ({
        ...currentState,
        unit,
        value: (() => {
          if (unit in NFieldLengthCSS.defaultUnitsOfMeasure) return unit
          if (unit in NFieldLengthCSS.numericUnits && !+currentState.value) return ''
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
  ['menu-items']: Array<NFieldLengthCSS.allUnits>
}

FieldLengthCSS.defaultProps = {
  'menu-items': Object.keys(NFieldLengthCSS.allUnits),
} as IDefaultProps

const styles = {
  container: css`
    display: grid;
    grid-auto-rows: 1fr;
    grid-gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(auto, 200px));
  `,
}

const withHMR = hot(FieldLengthCSS)
export { withHMR as FieldLengthCSS }
