import { UpsertCustInGrpResult } from '../api/kintone/types/restapi';
import { InputField, PatternType, ElementTarget } from './forms';


export interface ContactClassification extends InputField {
  classification: InputField
}

export interface StoreInputField extends InputField {
  territory?: string | '東' | '西'
}

export interface ContactField {
  contactType: { value: PatternType },
  contactValue: InputField,
  classification: InputField
}


export interface CustomerBasicInformation {
  [key: string]: InputField | ContactField[] | boolean | string | undefined,
  changed?: boolean,
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

type SubmitStatus = 'EDITTING' |  'VALIDATE' | 'VALIDATE_SUCCESS' | 'VALIDATE_ERROR' | 'FETCHING' | 'FETCH_ERROR' | 'SUCCESS' | 'SUCCES_UPDATE';
type SubmitPayload = { submitState: SubmitStatus, fetchResponse?: UpsertCustInGrpResult };

export interface CustomerGroupForm {
  changed?: boolean,
  groupId?: string,
  revision?: string,
  submitState: SubmitStatus,
  isSubmitted: boolean,
  hasError: boolean,
  customers: CustomerBasicInformation[],
  store: StoreInputField,
  agents: PersonsInCharge
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type HandleFieldChangeFunc = (e: ElementTarget) => void;

export type CustomerInstancePayload = { customerIdx: number };

export interface ContactPayload extends CustomerInstancePayload { contactIdx: number, fieldName: 'contactValue' | 'classification', value: string }

export type FieldPayload = BasicField & CustomerInstancePayload;

export interface BasicField { element: ElementTarget }

export interface CustGroupRecord {
  group: CustomerGroupTypes.SavedData,
  customers: CustomerTypes.SavedData[]
}

export type FieldActionType =
  | { type: 'CHANGE_CUST_INSTANCE', payload: FieldPayload }
  | { type: 'CHANGE_AGENT', payload: BasicField }
  | { type: 'CHANGE_STORE', payload: BasicField }
  | { type: 'SELECT_CHANGE', payload: FieldPayload }
  | { type: 'ADD' }
  | { type: 'CHANGE_SUBMITSTATE', payload: SubmitPayload }
  | { type: 'SUBMIT' }
  | { type: 'SET_SAME_AS_MAIN', payload: CustomerInstancePayload }
  | { type: 'REMOVE', payload: CustomerInstancePayload }
  | { type: 'CHANGE_BIRTHYEAR', payload: FieldPayload }
  | { type: 'CHANGE_CONTACT_VALUE', payload: ContactPayload }
  | { type: 'GET_GROUP_DATA', payload: CustGroupRecord };
