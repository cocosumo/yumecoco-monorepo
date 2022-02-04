interface FieldValidation { value: string, touched:boolean, hasError: boolean, errorMsg: string }

interface CustomerBasicInformation {
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

interface CustomerForm {
  customers : CustomerBasicInformation[],
}

type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type FieldActionType =
| { type: 'CHANGE', payload: InputChangeType, index?: number }
| { type: 'ADD' }
| { type: 'REMOVE', index: number };
