import { SelectChangeEvent } from '@mui/material';

type PatternType = 'email' | 'tel' | 'postal';

export interface InputField { value: string, touched: boolean, hasError: boolean, errorMsg: string, isRequired?:boolean, inputType?: PatternType }

export interface ContactField extends InputField {
  type: '電話番号１' | '電話番号２' | 'メール',
  classification: InputField,
}


export interface CustomerBasicInformation {
  [key: string]: InputField | ContactField[] | boolean,
  fullName: InputField,
  fullNameReading: InputField,
  gender: InputField,
  birthYear: InputField,
  birthMonth : InputField,
  birthDay : InputField,
  isSameAsMain: boolean,
  contacts : ContactField[],
  postal: InputField,
  address1: InputField,
  address2: InputField,
}

export interface CustomerForm {
  customers : CustomerBasicInformation[],
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ;
export type ContactPayload = { contactIdx: number, customerIdx: number, element: InputChangeType | SelectChangeEvent<string> };

export type FieldActionType =
| { type: 'CHANGE', payload: InputChangeType, index: number }
| { type: 'ADD' }
| { type: 'REMOVE', index: number }
| { type: 'CHANGE_BIRTHYEAR', payload: Date, index: number }
| { type: 'SELECT_CHANGE', payload: SelectChangeEvent<string>, index: number }
| { type: 'CHANGE_CONTACT_TEXT', payload: ContactPayload }
| { type: 'CHANGE_CONTACT_CLASS', payload: ContactPayload };
