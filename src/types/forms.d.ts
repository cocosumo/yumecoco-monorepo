import { SelectChangeEvent } from '@mui/material';



export interface FieldValidation { value: string, touched:boolean, hasError: boolean, errorMsg: string }

export interface CustomerBasicInformation {
  fullName: FieldValidation,
  fullNameReading: FieldValidation,
  gender: FieldValidation,
  birthYear: FieldValidation,
  birthMonth : FieldValidation,
  birthDay : FieldValidation,
  isSameAsMain: boolean,
  contacts : [
    {
      type: '電話番号１' | '電話番号2' | 'メール',
      value: string,
      classification: '',
      touched: false,
      hasError: false,
      errorMsg: '',
    },
  ],
  address: {
    postal: FieldValidation,
    address1: FieldValidation,
    address2: FieldValidation,
  },
}

export interface CustomerForm {
  customers : CustomerBasicInformation[],
}

export type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ;
export type FieldActionType =
| { type: 'CHANGE', payload: InputChangeType, index?: number }
| { type: 'ADD' }
| { type: 'REMOVE', index: number }
| { type: 'CHANGE_BIRTHDATE', payload: Date, index: number }
| { type: 'SELECT_CHANGE', payload: SelectChangeEvent<string>, index?: number };
