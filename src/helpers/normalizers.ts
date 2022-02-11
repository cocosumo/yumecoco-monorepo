import { isField } from './utils';
import { CustomerForm, ContactField, InputField, PersonsInCharge } from './../types/forms';

export const custIdsToGroupMems = (ids: string[]): CustomerGroupTypes.Data['members'] => {
  return {
    type: 'SUBTABLE',
    value: ids.map(item => {
      return {
        id: '',
        value: {
          customerId: { value: item },
          customerName: { value: '' },
        },
      };
    }),
  };
};

const convertContactsObj = (stateContacts: ContactField[]): CustomerTypes.Data['contacts'] => {
  return {
    type: 'SUBTABLE',
    value: stateContacts.map((item) => {
      return {
        id: '',
        value: {
          contactType: { value: item.contactType.value },
          contactValue: { value: item.contactValue.value },
          classification: { value: item.classification.value },
        },
      };
    }),
  };
};

const convertAgentsObj = (agents: PersonsInCharge): CustomerTypes.Data['agents'] => {
  return {
    type: 'SUBTABLE',
    value: Object.values(agents).reduce((prev, curr) => {
      if (curr.value.length !== 0) {

        return prev.concat([{
          id: '',
          value: {
            agentType: { value: curr.label },
            employeeName: { value: curr.value },
            employeeId: { value: curr.value },
          },
        }]);
      }

      return prev;
    }, [] as CustomerTypes.Data['agents']['value']),
  };
};

export const convertCustFormState = (state: CustomerForm): { customers: Partial<CustomerTypes.SavedData>[], group: Partial<CustomerGroupTypes.Data> } => {

  const groupRecord = {
    storeId: { value: state.store.value },
    agents: convertAgentsObj(state.agents as PersonsInCharge),
  };

  const customerRecords = state.customers.map((cust) => {


    return Object.entries(cust).reduce((prev, curr) => {
      const [fieldName, value] = curr;
      if (isField(value)) {
        return { ...prev, [fieldName]: { value: (value as InputField).value } };
      }

      switch (fieldName) {
        case 'contacts':
          return { ...prev, [fieldName]: convertContactsObj(value as ContactField[]) };

      }

      return prev;

    }, {});
  });


  return { customers: customerRecords, group: groupRecord };
};

export const testFunc = () => {

  return 'hello';
};