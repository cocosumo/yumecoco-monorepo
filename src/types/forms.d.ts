
import { AddCustomersInGroupResult } from '../api/kintone/transactions/addCustomersInGroup';

type PatternType = 'email' | 'tel' | 'postal';

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

export interface ContactClassification extends InputField {
  classification: InputField
}

export interface StoreInputField extends InputField {
  territory?: string | '東' | '西'
}

export interface ContactField {
  contactType: { value: string },
  contactValue: InputField,
  classification: InputField
}


export interface CustomerBasicInformation {
  [key: string]: InputField | ContactField[] | boolean | string | undefined,
  custId?: string,
  revision?: string,
  fullName: InputField,
  fullNameReading: InputField,
  gender: InputField,
  birthYear: InputField,
  birthMonth: InputField,
  birthDay: InputField,
  isSameAsMain: boolean,
  contacts: ContactField[],
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

type SubmitStatus = 'EDITTING' |  'VALIDATE' | 'VALIDATE_SUCCESS' | 'VALIDATE_ERROR' | 'FETCHING' | 'FETCH_ERROR' | 'SUCCESS';
type SubmitPayload = { submitState: SubmitStatus, fetchResponse?: AddCustomersInGroupResult };

export interface CustomerGroupForm {
  groupId?: string,
  revision?: string,
  submitState: SubmitStatus,
  isSubmitted: boolean,
  hasError: boolean,
  customers: CustomerBasicInformation[],
  store: StoreInputField,
  agents: PersonsInCharge
}

export interface ElementTarget {
  target: { name: string, value: string }
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type HandleFieldChangeFunc = (e: ElementTarget) => void;

export type CustomerInstancePayload = { customerIdx: number };

export interface ContactPayload extends CustomerInstancePayload { contactIdx: number, fieldName: 'contactValue' | 'classification', value: string }

export type FieldPayload = BasicField & CustomerInstancePayload;

export interface BasicField { element: ElementTarget }

export type FieldActionType =
  | { type: 'CHANGE_CUST_INSTANCE', payload: FieldPayload }
  | { type: 'CHANGE_AGENT', payload: BasicField }
  | { type: 'CHANGE_STORE', payload: BasicField }
  | { type: 'SELECT_CHANGE', payload: FieldPayload }
  | { type: 'ADD' }
  | { type: 'CHANGE_SUBMITSTATE', payload: SubmitPayload }
  | { type: 'SUBMIT' | 'VALIDATE' }
  | { type: 'SET_SAME_AS_MAIN', payload: CustomerInstancePayload }
  | { type: 'REMOVE', payload: CustomerInstancePayload }
  | { type: 'CHANGE_BIRTHYEAR', payload: FieldPayload }
  | { type: 'CHANGE_CONTACT_VALUE', payload: ContactPayload };
