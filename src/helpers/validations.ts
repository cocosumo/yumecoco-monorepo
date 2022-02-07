
import { InputField } from './../types/forms';

type Validate = (field: InputField ) => InputField ;
type ValueValidator = (value: string) => boolean;

/**
 * Validates based on natTextfield's native validity property.
 * @deprecated Unreliable, as some field types doesn't have validity property. Use validate() instead.
 *
 * @param validity
 * @returns error message
 */
const validationMessage = (validity: ValidityState) => {
  console.log(validity);
  if (!validity.valid){
    if (validity.valueMissing){
      return '必須です。';
    }
  }
  return '';
};

export const isEmail: ValueValidator = (value) => {
  return Boolean(value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ));
};

export const isPhoneNumber: ValueValidator = (value) => {
  return Boolean(value.match(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/,
  ));
};

export const isPostal: ValueValidator = (value) => {
  return Boolean(value.match(
    /^\d{3,4}-\d{4}$/,
  ));
};

/**
 * Validates based on field's current state
 *
 * @param field
 * @returns immutably updated state.
 */
export const validate: Validate = (field) => {
  let errors: string[] = [];

  let {
    hasError = false,
    helperText = '',
    inputType,
    value,
    isRequired,
  } = field;

  if (isRequired){
    if (value.length === 0){
      hasError = true;
      errors.push('必須です。');
    } else {
      hasError = false;
    }
  }

  switch (inputType){
    case 'email':
      hasError =  !isEmail(value);
      if (hasError) errors.push('有効なメールアドレスを入力ください。例：info@cocosumo.jp' );
      break;
    case 'tel':

      hasError = !isPhoneNumber(value);

      if (hasError) errors.push('半角数字。例：070-1264-1265');
      break;
    case 'postal':

      hasError = !isPostal(value);
      if (hasError) errors.push('正しくありません。例：441-8122。');
      break;
  }


  /* Remove error if optional and not empty*/
  if (!isRequired && value.length === 0) {
    hasError = false;
    helperText = '';
  } else {
    helperText = errors.join('');
  }

  return { ...field, ...{ hasError, helperText } };
};


export default validationMessage;