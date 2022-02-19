

export type PatternType = 'email' | 'tel' | 'postal';

export interface ElementTarget {
  target: { name: string, value: string }
}

export interface InputField {
  label: string,
  value: string,
  touched: boolean,
  hasError: boolean,
  helperText: string,
  placeholder?: string,
  isRequired?: boolean,
  inputType?: PatternType,
  infoText?: string,
  isDisabled?: boolean
}