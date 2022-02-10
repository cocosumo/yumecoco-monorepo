/* eslint-disable import/no-extraneous-dependencies */
import { CustomerForm } from './../../types/forms';
import { faker } from '@faker-js/faker';
faker.locale = 'ja';


export const custFormStateTestData = () : CustomerForm => {

  const birthDay = faker.date.between('1920/01/01', '1988/01/01');

  return ({
    hasError: true,
    isSubmitted: false,
    customers :
  [
    {
      fullName: { label: '氏名', value: `${faker.name.lastName()}　${faker.name.firstName()}`, touched:false, hasError: true, helperText: '', placeholder: '高橋　加奈', isRequired: true },
      fullNameReading: { label: 'シメイ', value: 'テスト　テスト', touched:false, hasError: true, helperText: '', placeholder: 'タカハシ　カナ', isRequired: true },
      gender: { label: '性別', value: '男性', touched:false, hasError: false, helperText: '' },
      birthYear: { label: '生年', value: birthDay.getFullYear().toString(), touched:false, hasError: false, helperText: '' },
      birthMonth : { label: '月', value: birthDay.getMonth().toString(), touched:false, hasError: false, helperText: '' },
      birthDay : { label: '日', value: birthDay.getDay().toString(), touched:false, hasError: false, helperText: '' },
      isSameAsMain: true,

      postalCode: { label: '郵便番号', value: '', touched:false, hasError: true, helperText: '', isRequired: true, inputType: 'postal', placeholder: '442-0888' },
      address1: { label: '住所',  value: '', touched:false, hasError: true, helperText: '', isRequired: true, placeholder: '愛知県豊川市千歳通３丁目' },
      address2: { label: '住所（番地以降）',  value: '', touched:false, hasError: false, helperText: '', isRequired: true, placeholder: '10-1'  },

      contacts : [
        {
          contactType:{ value: '電話番号１' },
          contactValue: { label: '電話番号1',  value: '', touched:false, hasError: false, helperText: '', isRequired: true, placeholder: '07014529707', inputType: 'tel'  },
          classification: { label: '種別',  value: '', touched:false, hasError: false, helperText: '', isRequired: true },
        },
        {
          contactType:{ value: '電話番号２' },
          contactValue: { label: '電話番号２',  value: '', touched:false, hasError: false, helperText: '', isRequired: false, placeholder: '07014529707', inputType: 'tel'  },
          classification: { label: '種別',  value: '', touched:false, hasError: false, helperText: '', isRequired: false },
        },
        {
          contactType:{ value: 'メールアドレス' },
          contactValue: { label: 'メールアドレス',  value: '', touched:false, hasError: false, helperText: '', isRequired: false, placeholder: 'info@cocosumo.net', inputType: 'email'  },
          classification: { label: '種別',  value: '', touched:false, hasError: false, helperText: '', isRequired: false },
        },
      ],
    },
  ],
    store:  { label: '店舗', value: '', touched:false, hasError: true, helperText: '', isRequired: true },
    agents: {
      coco1: { label: '営業担当者１', value: '', touched:false, hasError: true, helperText: '', isRequired: true },
      coco2: { label: '営業担当者２', value: '', touched:false, hasError: true, helperText: '', isRequired: false, infoText: '営業担当者が2名いる場合選択してください。' },
      yume1: { label: 'ゆめてつAG１', value: '', touched:false, hasError: true, helperText: '', isRequired: false },
      yume2: { label: 'ゆめてつAG２', value: '', touched:false, hasError: true, helperText: '', isRequired: false, infoText: '営業担当者が2名いる場合選択してください。'  },
    },

  });
};