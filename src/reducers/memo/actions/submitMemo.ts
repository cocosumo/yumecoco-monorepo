import { MemoFormState, SubmitPayload } from '../../../types/form.memo';
import validateFormState from './helpers/validateFormState';

const submitMemo = (state: MemoFormState, payload: SubmitPayload) : MemoFormState => {
  switch (payload.submitState) {
    case 'VALIDATE':
      const validatedResult  = validateFormState(state);
      return { ...validatedResult, submitState: validatedResult.hasError ? 'VALIDATE_ERROR' : 'VALIDATE_SUCCESS' };

    default:
      return { ...state, submitState: payload.submitState };
  }

};

export default submitMemo;