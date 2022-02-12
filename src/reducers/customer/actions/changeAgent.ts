import { BasicField, CustomerGroupForm } from '../../../types/forms';
import { validate } from './../../../helpers/validations';

type ChangeAgentAction = (state: CustomerGroupForm, payload: BasicField, isClassification?: boolean) => CustomerGroupForm;

const changeAgent : ChangeAgentAction = (state, payload) => {

  const { name, value } = payload.element.target;

  return {
    ...state, agents : {
      ...state.agents,  [name] : validate({ ...state.agents[name], value: value }),
    },
  };

};

export default changeAgent;