import { isField } from './utils';
import { CustomerForm, ContactField, InputField } from './../types/forms';


const convertContactsObj = (stateContacts : ContactField[]) : Omit<CustomerTypes.Data['contacts'], 'type'> => {

  return {
    value: stateContacts.map((item)=>{
      console.log(item);
      return {
        id: '',
        value: {
          contactType: { value: item.contactType.value },
          contactValue: { value: item.contactValue.value },
          classification : { value: item.classification.value },
        } };
    }),
  };
};

export const convertCustFormState = (state: CustomerForm) : Partial<CustomerTypes.SavedData>[] => {
  const kintoneRecord = state.customers.map((cust) => {

    return Object.entries(cust).reduce((prev, curr) => {
      const [fieldName, value] = curr;
      if (isField(value)){
        return { ...prev, [fieldName]: { value: (value as InputField).value } };
      }

      switch (fieldName){
        case 'contacts':
          return { ...prev, [fieldName] : convertContactsObj(value as ContactField[])  };
      }

      return prev;

    }, { store: { value: state.store.value } });

  });



  return kintoneRecord;
};

export const testFunc = () => {

  return 'hello';
};