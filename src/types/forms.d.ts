
type PatternType = 'email' | 'tel' | 'postal';

export interface InputField {
  label: string,
  value: string,
  touched: boolean,
  hasError: boolean,
  helperText: string,
  placeholder?: string,
  isRequired?:boolean,
  inputType?: PatternType,
  infoText?: string,
  isDisabled?: boolean
}

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
  postalCode: InputField,
  address1: InputField,
  address2: InputField,
}

export interface PersonsInCharge {
  [key: string]: InputField
  coco1: InputField,
  coco2: InputField,
  yume1: InputField,
  yume2: InputField,
}

export interface CustomerForm {
  isSubmitted: boolean,
  hasError: boolean,
  customers : CustomerBasicInformation[],
  store: InputField,
  agents: PersonsInCharge
}

export interface ElementTarget {
  target :  { name: string, value: string }
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ;

export type HandleFieldChangeFunc = (e: ElementTarget) => void;

export type CustomerInstancePayload = { customerIdx : number };

export interface ContactPayload extends CustomerInstancePayload { contactIdx: number, element: ElementTarget }

// export interface FieldPayload extends CustomerInstancePayload { element: ElementTarget }

export type FieldPayload = BasicField & CustomerInstancePayload;

export interface BasicField { element: ElementTarget }

export type FieldActionType =
| { type: 'CHANGE_CUST_INSTANCE', payload: FieldPayload }
| { type: 'CHANGE_AGENT', payload: BasicField }
| { type: 'CHANGE_STORE', payload: BasicField }
| { type: 'SELECT_CHANGE', payload: FieldPayload }
| { type: 'ADD' }
| { type: 'SUBMIT' }
| { type: 'SET_SAME_AS_MAIN', payload: CustomerInstancePayload }
| { type: 'REMOVE', payload: CustomerInstancePayload }
| { type: 'CHANGE_BIRTHYEAR', payload: FieldPayload }
| { type: 'CHANGE_CONTACT_TEXT', payload: FieldPayload }
| { type: 'CHANGE_CONTACT_CLASS', payload: FieldPayload };
