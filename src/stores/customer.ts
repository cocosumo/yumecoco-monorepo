const initialFormState : CustomerForm = { customers :
  [
    {
      fullName: { value: '', touched:false, hasError: true, errorMsg: '' },
      fullNameReading: { value: '', touched:false, hasError: false, errorMsg: '' },
      gender: { value: '', touched:false, hasError: false, errorMsg: '' },
      birthYear: { value: '', touched:false, hasError: false, errorMsg: '' },
      birthMonth : { value: '', touched:false, hasError: false, errorMsg: '' },
      birthDay : { value: '', touched:false, hasError: false, errorMsg: '' },
      isSameAsMain: true,
      contacts : [
        {
          type: '電話番号１',
          value: '',
          classification: '',
          touched: false,
          hasError: false,
          errorMsg: '',
        },
      ],
      address: {
        postal: { value: '', touched:false, hasError: false, errorMsg: '' },
        address1: { value: '', touched:false, hasError: false, errorMsg: '' },
        address2: { value: '', touched:false, hasError: false, errorMsg: '' },
      },
    },
  ],

};

export default initialFormState;