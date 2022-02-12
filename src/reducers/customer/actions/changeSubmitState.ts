import { CustomerGroupForm, SubmitPayload } from '../../../types/forms';
import validateFormState from './validateFormState';

type ChangeSubmitState = <T extends CustomerGroupForm>(state: T, payload: SubmitPayload) => T;


const setKintoneRecordIds : ChangeSubmitState = (state, payload : Required<SubmitPayload>) =>{
  const { group, customers } = payload.fetchResponse;

  return { ...state,
    groupId: group.id,
    revision: group.revision,
    customers: state.customers.map((cust, custIdx) => {
      return { ...cust, custId: customers.ids[custIdx], revision: customers.revisions[custIdx] };
    } ) };
};


const changeSubmitState : ChangeSubmitState = (state, payload) =>{
  switch (payload.submitState) {
    case 'VALIDATE':
      return { ...validateFormState(state), submitState: 'VALIDATE' };
    case 'SUCCESS':
      console.log('SUCCESS!', payload);
      return setKintoneRecordIds(state, payload);

    case 'VALIDATE_ERROR':
    case 'FETCHING':
    case 'FETCH_ERROR':
    case 'EDITTING':
      return { ...state, submitState: payload.submitState };
  }

  return state;
};

export default changeSubmitState;