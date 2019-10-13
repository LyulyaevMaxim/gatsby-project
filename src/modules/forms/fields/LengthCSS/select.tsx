import React from 'react'
import * as I from './index.d'

export const FieldSelectLengthCSS: React.FC<I.IFieldSelectLengthCSS> = React.memo(props => {
  const { menuItems } = props,
    onChange = React.useCallback(event => props.setParentState({ unit: event.target.value /*as I.allUnits*/ }), [])

  return (
    <select data-testid="field-lengthCSS-select" value={props.value} onChange={onChange}>
      {([...menuItems, !menuItems.includes(props.value) && props.value].filter(Boolean) as Array<I.allUnits>).map(
        currentOption => (
          <option value={currentOption} key={`option-${currentOption}`}>
            {I.allUnits[currentOption]}
          </option>
        )
      )}
    </select>
  )
})
