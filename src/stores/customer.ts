import { CustomerForm } from '../types/forms';

const initialFormState : CustomerForm = {
  isSubmitted: false,
  customers :
  [
    {
      fullName: { label: '氏名', value: '', touched:false, hasError: true, helperText: '必須です。', placeholder: '高橋　加奈', isRequired: true },
      fullNameReading: { label: 'シメイ', value: '', touched:false, hasError: true, helperText: '', placeholder: 'タカハシ　カナ', isRequired: true },
      gender: { label: '性別', value: '', touched:false, hasError: false, helperText: '' },
      birthYear: { label: '生年', value: '', touched:false, hasError: false, helperText: '' },
      birthMonth : { label: '月', value: '', touched:false, hasError: false, helperText: '' },
      birthDay : { label: '日', value: '', touched:false, hasError: false, helperText: '' },
      isSameAsMain: true,

      postal: { label: '郵便番号', value: '', touched:false, hasError: true, helperText: '', isRequired: true, inputType: 'postal', placeholder: '442-0888' },
      address1: { label: '住所',  value: '', touched:false, hasError: true, helperText: '', isRequired: true, placeholder: '愛知県豊川市千歳通３丁目' },
      address2: { label: '住所（番地以降）',  value: '', touched:false, hasError: false, helperText: '', isRequired: true, placeholder: '10-1'  },

      contacts : {
        tel1: {
          label: '電話番号１',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, helperText: '', isRequired: true },
          touched: false,
          hasError: false,
          helperText: '',
          isRequired: true,
          inputType: 'tel',
        },
        tel2 :{
          label: '電話番号１',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, helperText: '' },
          touched: false,
          hasError: false,
          helperText: '',
          inputType: 'tel',
        },
        email:{
          label: 'メール',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, helperText: '' },
          touched: false,
          hasError: false,
          helperText: '',
          inputType: 'email',
        },
      },


    },
  ],

};

export default initialFormState;