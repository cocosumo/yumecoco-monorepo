const validationMessage = (validity: ValidityState) => {
  if (!validity.valid){
    if (validity.valueMissing){
      return '必須です。';
    }
  }
  return '';
};

export default validationMessage;