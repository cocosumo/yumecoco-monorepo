import { CustomerForm, ContactField, PersonsInCharge } from './../types/forms';

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

export const convertCustFormState = (state: CustomerForm) => {

  const mainCustomer = state.customers[0];
  const mainContacts = convertContactsObj(mainCustomer.contacts);
  const mainAgents = convertAgentsObj(state.agents);

  const groupRecord = {
    storeId: { value: state.store.value },
    agents: mainAgents,
  };


  const customerRecords = state.customers.map((cust) => {
    const { fullName, fullNameReading, birthYear, birthMonth, birthDay, postalCode, address1, address2, contacts, gender, isSameAsMain } = cust;


    return {

      fullName: { value: fullName.value },
      fullNameReading: { value: fullNameReading.value },
      gender: { value: gender.value },
      birthYear: { value: birthYear.value },
      birthMonth: { value: birthMonth.value },
      birthDay: { value: birthDay.value },
      postalCode: { value: isSameAsMain ? mainCustomer.postalCode.value : postalCode.value },
      address1: { value: isSameAsMain ? mainCustomer.address1.value : address1.value },
      address2: { value: isSameAsMain ? mainCustomer.address2.value : address2.value },
      contacts: isSameAsMain ? mainContacts : convertContactsObj(contacts),

    };

  });


  return { customers: customerRecords, group: groupRecord };
};

export const testFunc = () => {

  return 'hello';
};