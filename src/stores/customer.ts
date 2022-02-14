import { CustomerGroupForm } from '../types/forms';

const initialFormState: CustomerGroupForm = {
  submitState: 'EDITTING',
  hasError: true,
  isSubmitted: false,
  customers:
    [
      {
        fullName: { label: '氏名', value: '', touched: false, hasError: true, helperText: '', placeholder: '山田　太郎', isRequired: true },
        fullNameReading: { label: '氏名フリガナ', value: '', touched: false, hasError: true, helperText: '', placeholder: 'ヤマダ　タロウ', isRequired: true },
        gender: { label: '性別', value: '', touched: false, hasError: false, helperText: '' },
        birthYear: { label: '生年', value: '', touched: false, hasError: false, helperText: '' },
        birthMonth: { label: '月', value: '', touched: false, hasError: false, helperText: '' },
        birthDay: { label: '日', value: '', touched: false, hasError: false, helperText: '' },
        isSameAsMain: true,

        postalCode: { label: '郵便番号', value: '', touched: false, hasError: true, helperText: '', isRequired: true, inputType: 'postal', placeholder: '471-0041' },
        address1: { label: '住所', value: '', touched: false, hasError: true, helperText: '', isRequired: true, placeholder: '愛知県豊田市汐見町8丁目87-8' },
        address2: { label: '住所（建物名）', value: '', touched: false, hasError: false, helperText: '', isRequired: true, placeholder: 'マンション山豊101' },

        contacts: [
          {
            contactType: { value: '電話番号１' },
            contactValue: { label: '電話番号1', value: '', touched: false, hasError: false, helperText: '', isRequired: true, placeholder: '07014529707', inputType: 'tel' },
            classification: { label: '続柄', value: '', touched: false, hasError: false, helperText: '', isRequired: true },
          },
          {
            contactType: { value: '電話番号２' },
            contactValue: { label: '電話番号２', value: '', touched: false, hasError: false, helperText: '', isRequired: false, placeholder: '07014529707', inputType: 'tel' },
            classification: { label: '続柄', value: '', touched: false, hasError: false, helperText: '', isRequired: false },
          },
          {
            contactType: { value: 'メールアドレス' },
            contactValue: { label: 'メールアドレス', value: '', touched: false, hasError: false, helperText: '', isRequired: false, placeholder: 'info@cocosumo.net', inputType: 'email' },
            classification: { label: '続柄', value: '', touched: false, hasError: false, helperText: '', isRequired: false },
          },
        ],
      },
    ],
  store: { label: '店舗', value: '', touched: false, hasError: true, helperText: '', isRequired: true },
  agents: {
    coco1: { label: '営業担当者１', value: '', touched: false, hasError: true, helperText: '', isRequired: true },
    coco2: { label: '営業担当者２', value: '', touched: false, hasError: true, helperText: '', isRequired: false, infoText: '営業担当者が2名いる場合選択してください。' },
    yume1: { label: 'ゆめてつAG１', value: '', touched: false, hasError: true, helperText: '', isRequired: false },
    yume2: { label: 'ゆめてつAG２', value: '', touched: false, hasError: true, helperText: '', isRequired: false, infoText: '営業担当者が2名いる場合選択してください。' },
  },

};

export default initialFormState;