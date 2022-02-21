import { validate } from '../../../../helpers/validations';
import { MemoFormState } from '../../../../types/form.memo';
import { InputField } from '../../../../types/forms';

const validateFormState = (state: MemoFormState) : MemoFormState=> {

  let hasError = false;

  const setHasError = (field: InputField) => {
    const res = validate(field);
    if (res.hasError) hasError = true;

    return res;
  };

  const newState : MemoFormState = { ...state,
    memoType: setHasError(state.memoType),
    memoContents: setHasError(state.memoContents),
  };

  return { ...newState,
    isSubmitted: true,
    hasError,
  };
};

export default validateFormState;