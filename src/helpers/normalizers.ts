import { isField } from './utils';
import { ContactField, CustomerForm, InputField } from './../types/forms';


const convertContactsObj = (contactsObj : ContactField) : Omit<CustomerTypes.Data['contacts'], 'type'> => {
  return {
    
    value: Object.values(contactsObj).map(({ classification, value, label })=>{
      return {
        id: '',
        value: {
          contactType: { value: label },
          contactValue: { value },
          classification: {
            value: classification.value,
          },
        },
      };
    }),
  };
};

export const convertCustFormState = (state: CustomerForm) : Partial<CustomerTypes.SavedData>[] => {
  const kintoneRecord = state.customers.map((cust) => {

    return Object.entries(cust).reduce((prev, curr) => {
      const [fieldName, value] = curr;
      if (isField(value)){
        return { ...prev, [fieldName]: { value: (value as InputField).value } };
      } else if (fieldName === 'contacts'){

        return { ...prev, [fieldName] : convertContactsObj(value as ContactField) };
      }
      return prev;
    }, {});

  });



  return kintoneRecord;
};

export const testFunc = () => {

  return 'hello';
};