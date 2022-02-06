import  { validate } from '../../../helpers/validations';
import { CustomerForm, FieldPayload } from '../../../types/forms';



type Action = (state: CustomerForm, payload: FieldPayload, isClassification?: boolean) => CustomerForm;

/**
 * Updates both text, and classification state of contact instance. See type definition for details
 * 
 * @param state 
 * @param payload  
 * @returns 
 */
export const changeContact: Action = (state, payload) =>  {

  const { element, customerIdx } = payload;

  const name = element.target.name; // tel, tel2, email
  const value = element.target.value; 

  /* Immutably update contact state */
  return { ...state, 
    customers: [
      ...state.customers.map(
        (customer, idx)=> {
          if (idx === customerIdx){


            return { 
              ...customer, contacts : {
                ...customer.contacts, [name] : {
                  ...customer.contacts[name], ...validate({ ...customer.contacts[name], value }),
                },
              },
            };
          }

          
          return customer;
        },
      ),
    ], 
  } ;
  
};


