import { InitialMemoPayload, MemoFormState } from '../../../types/form.memo';

const setInitial = <T extends MemoFormState, U extends InitialMemoPayload>(state: T, payload: U): T => {
  return {
    ...state,
    ...payload,
    $id: undefined,
    isNotify: false };
};

export default setInitial;