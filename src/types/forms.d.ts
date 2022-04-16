

export type PatternType = 'email' | 'tel' | 'postal';
export type AgentTypes = 'cocoAG' | 'yumeAG' | 'cocoConst';

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

export type SubmitStatus = 'EDITTING' |  'VALIDATE' | 'VALIDATE_SUCCESS' | 'VALIDATE_ERROR' | 'CONFIRM_SAVE' | 'FETCHING' | 'FETCH_ERROR' | 'SUCCESS' | 'SUCCES_UPDATE';


export interface FormState {
  isSubmitted: boolean,
  submitState: SubmitStatus
}