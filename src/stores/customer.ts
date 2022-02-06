import { CustomerForm } from '../types/forms';

const initialFormState : CustomerForm = {
  isSubmitted: false,
  customers :
  [
    {
      fullName: { value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
      fullNameReading: { value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
      gender: { value: '', touched:false, hasError: false, errorMsg: '' },
      birthYear: { value: '', touched:false, hasError: false, errorMsg: '' },
      birthMonth : { value: '', touched:false, hasError: false, errorMsg: '' },
      birthDay : { value: '', touched:false, hasError: false, errorMsg: '' },
      isSameAsMain: true,
      contacts : [
        {
          type: '電話番号１',
          value: '',
          classification: { value: '', touched:false, hasError: false, errorMsg: '' },
          touched: false,
          hasError: false,
          errorMsg: '',
          isRequired: true,
          inputType: 'tel',
        },
        {
          type: '電話番号２',
          value: '',
          classification: { value: '', touched:false, hasError: false, errorMsg: '' },
          touched: false,
          hasError: false,
          errorMsg: '',
          inputType: 'tel',
        },
        {
          type: 'メール',
          value: '',
          classification: { value: '', touched:false, hasError: false, errorMsg: '' },
          touched: false,
          hasError: false,
          errorMsg: '',
          inputType: 'email',
        },
      ],

      postal: { value: '', touched:false, hasError: false, errorMsg: '', isRequired: true, inputType: 'postal' },
      address1: { value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
      address2: { value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },

    },
  ],

};

export default initialFormState;