// import  { validate } from '../../../helpers/validations';
import { validate } from '../../../helpers/validations';
import { ContactPayload, CustomerForm } from '../../../types/forms';



type Action = (state: CustomerForm, payload: ContactPayload, isClassification?: boolean) => CustomerForm;

/**
 * Updates both text, and classification state of contact instance. See type definition for details
 *
 * @param state
 * @param payload
 * @param isClassification
 * @returns
 */
export const changeContact: Action = (state, payload) =>  {
  console.log(payload);
  return { ...state, customers: [
    ...state.customers.map((customer, idx) => {
      if (idx === payload.customerIdx){
        return { ...customer, contacts: [
          ...customer.contacts.map((contact, cIdx)=>{
            if (cIdx === payload.contactIdx){
              return { ...contact, [payload.fieldName]: validate({ ...contact[payload.fieldName], value: payload.value }) };
            }
            return contact;
          })] };
      }
      return customer;
    } ),
  ] };

};


