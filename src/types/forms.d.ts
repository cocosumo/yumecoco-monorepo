
type PatternType = 'email' | 'tel' | 'postal';

export interface InputField {label: string, value: string, touched: boolean, hasError: boolean, errorMsg: string, placeholder?: string, isRequired?:boolean, inputType?: PatternType }

export interface ContactClassification extends InputField  {
  classification: InputField
}
export interface ContactField  {
  [key: string]: ContactClassification,
  tel1: ContactClassification,
  tel2: ContactClassification,
  email: ContactClassification
}


export interface CustomerBasicInformation {
  [key: string]: InputField | ContactField | boolean,
  fullName: InputField,
  fullNameReading: InputField,
  gender: InputField,
  birthYear: InputField,
  birthMonth : InputField,
  birthDay : InputField,
  isSameAsMain: boolean,
  contacts : ContactField,
  postal: InputField,
  address1: InputField,
  address2: InputField,
}

export interface CustomerForm {
  isSubmitted: boolean,
  customers : CustomerBasicInformation[],
}

export interface ElementTarget {
  target :  { name: string, value: string }
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ;

export type HandleFieldChangeFunc = (e: ElementTarget) => void;

export type CustomerInstancePayload = { customerIdx : number };

export interface ContactPayload extends CustomerInstancePayload { contactIdx: number, element: ElementTarget }

export interface FieldPayload extends CustomerInstancePayload {element: ElementTarget }

export type FieldActionType =
| { type: 'CHANGE', payload: FieldPayload }
| { type: 'SELECT_CHANGE', payload: FieldPayload }
| { type: 'ADD' }
| { type: 'SUBMIT' }
| { type: 'SET_SAME_AS_MAIN', payload: CustomerInstancePayload }
| { type: 'REMOVE', payload: CustomerInstancePayload }
| { type: 'CHANGE_BIRTHYEAR', payload: FieldPayload }
| { type: 'CHANGE_CONTACT_TEXT', payload: FieldPayload }
| { type: 'CHANGE_CONTACT_CLASS', payload: FieldPayload };
