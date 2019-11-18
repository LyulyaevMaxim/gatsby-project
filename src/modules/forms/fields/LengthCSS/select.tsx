import React from 'react'
import { Select } from 'modules/forms/select'
import * as NFieldLengthCSS from './@types'

export const FieldSelectLengthCSS: React.FC<NFieldLengthCSS.IFieldSelectLengthCSS> = React.memo(props => {
  const { menuItems } = props,
    options = React.useMemo(
      () =>
        ([...menuItems, !menuItems.includes(props.value) && props.value].filter(Boolean) as Array<
          NFieldLengthCSS.allUnits
        >).map(currentOption => ({ value: currentOption, label: NFieldLengthCSS.allUnits[currentOption] })),
      [menuItems, props.value]
    ),
    onChange = React.useCallback(newSelectedOption => {
      if (props.setParentState) props.setParentState({ unit: (newSelectedOption || options[0]).value })
    }, []),
    selectedOption = React.useMemo(() => options.find(option => option.value === props.value), [props.value, options])

  return (
    <Select
      name="field-lengthCSS-select"
      isClearable
      isSearchable
      placeholder='place'
      value={selectedOption}
      options={options}
      onChange={onChange}
      menuPosition="fixed"
      {...(process.env.IS_TESTS && { classNamePrefix: 'select' })}
    />
  )
})
