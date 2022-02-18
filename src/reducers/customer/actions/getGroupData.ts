
import { CustGroupRecord, CustomerGroupForm } from '../../../types/forms';



export const getGroupData = (state: CustomerGroupForm, payload : CustGroupRecord): CustomerGroupForm => {

  const { group, customers } = payload;

  console.log(payload);

  return { ...state,

    groupId: group.$id.value,

    store: { ...state.store, value: group.storeId.value },

    agents: Object.entries(state.agents).reduce((prev, [key, curr]) => {
      const agent = group.agents.value.find( ag => ag.value.agentType.value === key );
      if (agent){
        return { ...prev, [key]: { ...curr, value: agent?.value.employeeId.value } };
      }
      return prev;
    }, { ...state.agents }),

    customers: customers.map((cust, custIdx) => {
      return {
        ...Object.entries(state.customers[custIdx]).reduce((prev, [key, curr]) => {
          if (cust.hasOwnProperty(key)){
            const recVal = cust[key as keyof typeof cust];
            if (recVal.type !== 'SUBTABLE'){
              console.log(curr, key);
              /* Casted to any, will review a better type to this */
              return { ...prev, [key]: { ...(curr as any), value: recVal.value } };
            }
          }
          return prev;
        }, { ...state.customers[custIdx] }),

      };
    }),


    revision: group.$revision.value,
  };
};