import React from 'react'
import Select from 'react-select'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { languages } from 'modules/i18'
import { theme } from 'styles/theme'

interface ILocaleSelect {}

export const LocaleSelect: React.FC<ILocaleSelect> = () => {
  const { t: tCommon } = useTranslation('common'),
    selectSettings = React.useMemo(() => {
      const options = [
        ...languages.map(language => ({
          value: language,
          get label() {
            return tCommon(`languages.${language}`)
          },
          isDisabled: language === 'ar', //as example
        })),
      ]
      return { options, defaultValue: options.find(option => option.value === i18next.language) }
    }, []),
    onChange = React.useCallback(({ value }) => i18next.changeLanguage(value), [])

  return (
    <Select
      defaultValue={selectSettings.defaultValue}
      options={selectSettings.options}
      onChange={onChange}
      styles={selectStyles}
    />
  )
}

const withIconStyles = ({ iconName }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.only('xs')]: {
    fontSize: 0,
  },

  ':before': {
    content: '" "',
    display: 'block',
    minWidth: 20,
    minHeight: 20,
    borderRadius: '50%',
    backgroundColor: theme.palette.getColor('lightBlue', 200),
    backgroundImage: `url(/images/languages/${iconName}.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginRight: theme.spacing(1),
  },
})

const selectStyles = {
  singleValue: (styles, { data }) => ({
    ...styles,
    ...withIconStyles({ iconName: data.value }),
  }),
  option: (styles, { data, isDisabled, isSelected }) => ({
    ...styles,
    ...withIconStyles({ iconName: data.value }),
    ...(isSelected && { display: 'none' }),
    ...(isDisabled && { filter: 'opacity(0.5)', cursor: 'not-allowed' }),
    color: theme.palette.getColor('blueGrey', 900),
  }),
  input: styles => ({ ...styles, caretColor: 'transparent ' }),
}
