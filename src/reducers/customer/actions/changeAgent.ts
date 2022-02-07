import { BasicField, CustomerForm } from '../../../types/forms';

type ChangeAgentAction = (state: CustomerForm, payload: BasicField, isClassification?: boolean) => CustomerForm;

const changeAgent : ChangeAgentAction = (state, payload) => {

  const { name, value } = payload.element.target;

  console.log(payload);
  return { 
    ...state, personsInCharge : {
      ...state.personsInCharge,  [name] : {
        ...state.personsInCharge[name], value: value,
      },
    }, 
  };

};

export default changeAgent;