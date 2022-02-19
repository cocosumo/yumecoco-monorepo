import { InitialMemoPayload, MemoFormState } from '../../../types/form.memo';

const setInitial = <T extends MemoFormState, U extends InitialMemoPayload>(state: T, payload: U): T => {
  console.log(payload);
  return { ...state, ...payload };
};

export default setInitial;