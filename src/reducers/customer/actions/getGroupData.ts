

import { CustGroupRecord, CustomerGroupForm, InputField } from '../../../types/forms';


const adjustCustomerLength = (state: CustomerGroupForm, size: number) : CustomerGroupForm => {
  const blankCustomerState = JSON.stringify(state.customers[0]);

  return { ...state, customers: [...Array(size)].map(() => {
    return JSON.parse(blankCustomerState);
  }) };
};


export const getGroupData = (state: CustomerGroupForm, payload : CustGroupRecord): CustomerGroupForm => {

  const { group, customers } = payload;

  const newState = adjustCustomerLength(state, customers.length);

  console.log(customers, group);

  return { ...newState,

    groupId: group.$id.value,

    store: { ...newState.store, value: group.storeId.value },

    agents: Object.entries(newState.agents).reduce((prev, [key, curr]) => {
      const agent = group.agents.value.find( ag => ag.value.agentType.value === key );
      if (agent){
        return { ...prev, [key]: { ...curr, value: agent?.value.employeeId.value } };
      }
      return prev;
    }, { ...newState.agents }),

    customers: group.members.value.map((member, custIdx) => {
      /* Respect sorting of members in group */
      const memberId = member.value.customerId.value;
      const cust = customers.find(customer => customer.$id.value === memberId) as CustomerTypes.SavedData ;

      return {
        ...Object.entries(newState.customers[custIdx]).reduce((prev, [key, curr]) => {
          if (cust.hasOwnProperty(key)){
            const recVal = cust[key as keyof typeof cust];
            if (recVal.type !== 'SUBTABLE'){
              return { ...prev, [key]: { ...(curr as InputField), value: recVal.value } };
            } else if (key === 'contacts') {
              return { ...prev, [key] : (curr as any[]).map((contact, contactIdx) => {
                const recContactRow  = cust[key].value[contactIdx].value;
                const currentRow = prev[key][contactIdx];

                return { ...currentRow,
                  classification: {
                    ...currentRow.classification,
                    value: recContactRow.classification.value,
                  },
                  contactType: {
                    ...currentRow.contactType,
                    value: recContactRow.contactType.value,
                  },
                  contactValue: {
                    ...currentRow.contactValue,
                    value: recContactRow.contactValue.value,
                  },
                };
              }) };

            }
          }

          return prev as any;
        }, { ...newState.customers[custIdx], custId: cust.$id.value, revision: cust.$revision.value  }),

      };
    }),


    revision: group.$revision.value,
  };
};