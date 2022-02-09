import { CustomerForm } from './../../types/forms';

export const custFormStateTestData : CustomerForm = {
  hasError: true,
  isSubmitted: false,
  customers :
  [
    {
      fullName: { label: '氏名', value: 'Ras, Lorenz T', touched:false, hasError: true, helperText: '', placeholder: '高橋　加奈', isRequired: true },
      fullNameReading: { label: 'シメイ', value: 'ラス　ロレンズ　トンボ', touched:false, hasError: true, helperText: '', placeholder: 'タカハシ　カナ', isRequired: true },
      gender: { label: '性別', value: '男性', touched:false, hasError: false, helperText: '' },
      birthYear: { label: '生年', value: '2000', touched:false, hasError: false, helperText: '' },
      birthMonth : { label: '月', value: '10', touched:false, hasError: false, helperText: '' },
      birthDay : { label: '日', value: '31', touched:false, hasError: false, helperText: '' },
      isSameAsMain: true,

      postalCode: { label: '郵便番号', value: '441-8124', touched:false, hasError: true, helperText: '', isRequired: true, inputType: 'postal', placeholder: '442-0888' },
      address1: { label: '住所',  value: 'テスト', touched:false, hasError: true, helperText: '', isRequired: true, placeholder: '愛知県豊川市千歳通３丁目' },
      address2: { label: '住所（番地以降）',  value: 'どこでも', touched:false, hasError: false, helperText: '', isRequired: true, placeholder: '10-1'  },

      contacts : {
        tel1: {
          label: '電話番号１',
          value: '',
          classification: { label: '種別', value: '07014529707', touched:false, hasError: false, helperText: '', isRequired: true },
          touched: false,
          hasError: false,
          helperText: '',
          isRequired: true,
          inputType: 'tel',
        },
        tel2 :{
          label: '電話番号２',
          value: '',
          classification: { label: '種別', value: '', touched:false, hasError: false, helperText: '' },
          touched: false,
          hasError: false,
          helperText: '',
          inputType: 'tel',
        },
        email:{
          label: 'メール',
          value: 'lenzras@gmail.com',
          classification: { label: '種別', value: '', touched:false, hasError: false, helperText: '' },
          touched: false,
          hasError: false,
          helperText: '',
          inputType: 'email',
        },
      },
    },
  ],
  store:  { label: '店舗', value: '', touched:false, hasError: true, helperText: '', isRequired: true },
  agents: {
    coco1: { label: '営業担当者１', value: '', touched:false, hasError: true, helperText: '', isRequired: true },
    coco2: { label: '営業担当者２', value: '', touched:false, hasError: true, helperText: '', isRequired: false, infoText: '営業担当者が2名いる場合選択してください。' },
    yume1: { label: 'ゆめてつAG１', value: '', touched:false, hasError: true, helperText: '', isRequired: false },
    yume2: { label: 'ゆめてつAG２', value: '', touched:false, hasError: true, helperText: '', isRequired: false, infoText: '営業担当者が2名いる場合選択してください。'  },
  },

};