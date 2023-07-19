import { ICustgroups } from 'types';
import { TForm } from '../schema';

export const formToDBCustGroup = (
  formData: TForm,
): Partial<ICustgroups> => {


  const {
    store,
    cocoAG1,
    cocoAG2,
    yumeAG1,
    yumeAG2,
    isDeleted,
    memo,
  } = formData;


  /* Only include specified agents */
  const agents = Object.entries({
    cocoAG1,
    cocoAG2,
    yumeAG1,
    yumeAG2,
  }).reduce((accu, [key, value]) => {
    if (value) {
      return [...accu, [key.replace(/\d+/g, ''), value]];
    }
    return accu;
  }, [] as Array<[string, string]>);


  return {
    isDeleted: { value: (+isDeleted).toString() },
    storeId: { value: store },
    memo: { value: memo },
    agents: {
      type: 'SUBTABLE',
      value: agents?.map(([type, empId])=>{
        return {
          id: '',
          value: {
            agentType: { value: type },
            employeeId: { value: empId },
            employeeName: { value: 'auto' },
            email: { value: 'auto' },
          },
        };
      }) || [],
    },
  };
};