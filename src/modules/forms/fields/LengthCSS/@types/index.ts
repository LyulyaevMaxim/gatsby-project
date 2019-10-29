//namespace NFieldLengthCSS
export enum defaultUnitsOfMeasure {
  'auto' = '-',
  // 'initial' = '-',
  // 'inherit' = '-',
}

export enum unitsOfLengthMeasure {
  'cap' = 'cap',
  'ch' = 'ch',
  'em' = 'em',
  'ex' = 'ex',
  'ic' = 'ic',
  'lh' = 'lh',
  'rem' = 'rem',
  'rlh' = 'rlh',
  'vh' = 'vh',
  'vw' = 'vw',
  'vi' = 'vi',
  'vb' = 'vb',
  'vmin' = 'vmin',
  'vmax' = 'vmax',
  'px' = 'px',
  'cm' = 'cm',
  'mm' = 'mm',
  'Q' = 'Q',
  'in' = 'in',
  'pc' = 'pc',
  'pt' = 'pt',
}

export enum additionalUnitsOfMeasure {
  '%' = '%',
}

export const numericUnits = {
    ...unitsOfLengthMeasure,
    ...additionalUnitsOfMeasure,
  },
  allUnits = {
    ...defaultUnitsOfMeasure,
    ...numericUnits,
  }

export type allUnits =
  | keyof typeof defaultUnitsOfMeasure
  | keyof typeof unitsOfLengthMeasure
  | keyof typeof additionalUnitsOfMeasure

export interface IFieldLengthCSS {
  ['menu-items']?: Array<allUnits>
  value?: string
  onChange?: (newState: { value: string; unit: allUnits }) => any
}

export interface IFieldInputLengthCSS {
  value: string
  setParentState?: (valuesFromInput: IPatternCorrectInputByGroups) => void
}

export interface IFieldSelectLengthCSS {
  menuItems: Array<allUnits>
  value: allUnits
  setParentState?: (valuesFromSelect: { unit: allUnits }) => void
}

export interface IPatternCorrectInputByGroups {
  defaultValue?: string
  number?: string
  unit?: allUnits
}
