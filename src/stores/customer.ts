import { CustomerForm } from '../types/forms';

const initialFormState : CustomerForm = {
  isSubmitted: false,
  customers :
  [
    {
      fullName: { label: '氏名', value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
      fullNameReading: { label: 'シメイ', value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
      gender: { label: '性別', value: '', touched:false, hasError: false, errorMsg: '' },
      birthYear: { label: '生年', value: '', touched:false, hasError: false, errorMsg: '' },
      birthMonth : { label: '月', value: '', touched:false, hasError: false, errorMsg: '' },
      birthDay : { label: '日', value: '', touched:false, hasError: false, errorMsg: '' },
      isSameAsMain: true,
      contacts : {
        tel1: {
          label: '電話番号１',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
          touched: false,
          hasError: false,
          errorMsg: '',
          isRequired: true,
          inputType: 'tel',
        },
        tel2 :{
          label: '電話番号１',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, errorMsg: '' },
          touched: false,
          hasError: false,
          errorMsg: '',
          inputType: 'tel',
        },
        email:{
          label: 'メール',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, errorMsg: '' },
          touched: false,
          hasError: false,
          errorMsg: '',
          inputType: 'email',
        },
      },

      postal: { label: '郵便番号', value: '', touched:false, hasError: false, errorMsg: '', isRequired: true, inputType: 'postal' },
      address1: { label: '住所',  value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },
      address2: { label: '住所（番地以降）',  value: '', touched:false, hasError: false, errorMsg: '', isRequired: true },

    },
  ],

};

export default initialFormState;