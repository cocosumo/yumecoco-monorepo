import  { validate } from '../../../helpers/validations';
import { CustomerForm, ContactPayload, ContactField } from '../../../types/forms';



type Action = (state: CustomerForm, payload: ContactPayload, isClassification?: boolean) => CustomerForm;

/**
 * Updates both text, and classification state of contact instance. See type definition for details
 * 
 * @param state 
 * @param payload 
 * @param isClassification true: selectfield passed, false: textfield passed   
 * @returns 
 */
export const changeContact: Action = (state, payload, isClassification = false) =>  {

  const { contactIdx, customerIdx, element } = payload;

  const value = element.target.value;


  /* Immutably update contact state */
  return { ...state, 
    customers: [
      ...state.customers.map(
        (customer, idx)=> {
          if (idx === customerIdx){
            return { 
              ...customer, 
              contacts: [
                ...customer.contacts.map(
                  (contact, cidx)=> {
                    if (cidx === contactIdx) {
                      if (isClassification){
                        return { ...contact, classification: { ...contact.classification, ...{ value, touched: true } } };
                      } 
                      const newContactState = <ContactField>validate({ ...contact, ...{ value, touched: true } });
                      return newContactState;
                    }
                    return contact;
                  },
                ),
              ], 
            };
          }
          return customer;
        },
      ),
    ], 
  } ;
  
};


