import React from 'react'
import * as NFieldLengthCSS  from './@types'

export const FieldSelectLengthCSS: React.FC<NFieldLengthCSS.IFieldSelectLengthCSS> = React.memo(props => {
  const { menuItems } = props,
    onChange = React.useCallback(event => {
      if (props.setParentState) props.setParentState({ unit: event.target.value })
    }, [])

  return (
    <select data-testid="field-lengthCSS-select" value={props.value} onChange={onChange}>
      {([...menuItems, !menuItems.includes(props.value) && props.value].filter(Boolean) as Array<NFieldLengthCSS.allUnits>).map(
        currentOption => (
          <option value={currentOption} key={`option-${currentOption}`}>
            {NFieldLengthCSS.allUnits[currentOption]}
          </option>
        )
      )}
    </select>
  )
})
