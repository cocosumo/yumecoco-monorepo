import { CustomerForm, SubmitPayload } from '../../../types/forms';
import validateFormState from './validateFormState';


type ChangeSubmitState = <T extends CustomerForm>(state: T, payload: SubmitPayload) => T;
const changeSubmitState : ChangeSubmitState = (state, payload) =>{
  switch (payload.submitState) {
    case 'VALIDATE':
      return { ...validateFormState(state), submitState: 'VALIDATE' };
    case 'VALIDATE_ERROR':
    case 'FETCHING':
    case 'SUCCESS':
    case 'FETCH_ERROR':
    case 'EDITTING':
      return { ...state, submitState: payload.submitState };
  }

};

export default changeSubmitState;