import { ElementTarget, InputField } from '../../../types/forms';
import { MemoFormState } from '../../../types/form.memo';

const changeMemoValue = (state: MemoFormState, payload: ElementTarget): MemoFormState => {
  const { name, value } = payload.target;
  console.log(payload, 'payload');
  return { ...state, [name] : { ...state[name] as InputField, value } };
};

export default changeMemoValue;