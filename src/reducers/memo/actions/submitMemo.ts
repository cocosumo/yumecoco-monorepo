
import { MemoFormState, SubmitPayload } from '../../../types/form.memo';
import validateFormState from './helpers/validateFormState';

const submitMemo = (state: MemoFormState, payload: SubmitPayload) : MemoFormState => {
  console.log('submit state', payload.submitState);
  switch (payload.submitState) {
    case 'VALIDATE':
      const validatedResult  = validateFormState(state);
      return { ...validatedResult, submitState: validatedResult.hasError ? 'VALIDATE_ERROR' : 'VALIDATE_SUCCESS' };
    case 'SUCCESS':
      return { ...state,
        submitState: payload.submitState,
        memoType: { ...state.memoType, value: '' },
        memoContents: { ...state.memoContents, value: '' },
      };
    default:
      return { ...state, submitState: payload.submitState };
  }

};

export default submitMemo;