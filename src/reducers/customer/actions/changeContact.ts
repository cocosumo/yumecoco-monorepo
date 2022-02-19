import { validate } from '../../../helpers/validations';
import { ContactPayload, CustomerGroupForm } from '../../../types/forms';



type Action = <T extends CustomerGroupForm>(state: T, payload: ContactPayload) => T;

/**
 * Updates both text, and classification state of contact instance. See type definition for details
 *
 * @param state
 * @param payload
 * @returns
 */
export const changeContact: Action = (state, payload) =>  {

  return { ...state, customers: [
    ...state.customers.map((customer, idx) => {
      if (idx === payload.customerIdx){
        return { ...customer, contacts: [
          ...customer.contacts.map((contact, cIdx)=>{

            if (cIdx === payload.contactIdx){
              return { ...contact, [payload.fieldName]: validate({ ...contact[payload.fieldName], value: payload.value }) };
            }
            return { ...contact };
          })] };
      }
      return customer;
    } ),
  ] };

};


