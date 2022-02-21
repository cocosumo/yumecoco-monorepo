import { ElementTarget, InputField } from '../../../types/forms';
import { MemoFormState } from '../../../types/form.memo';
import { validate } from '../../../helpers/validations';

const changeMemoValue = (state: MemoFormState, payload: ElementTarget): MemoFormState => {
  const { name, value } = payload.target;

  const validatedInput = validate({ ...state[name as keyof MemoFormState] as InputField, value });

  return { ...state, [name] : validatedInput };
};

export default changeMemoValue;