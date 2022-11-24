import { ICustgroups, IEmployees } from 'types';
import { TypeOfForm } from '../form';

export const formToDBCustGroup = (
  formData: TypeOfForm,
  employees: IEmployees[],
): Partial<ICustgroups> => {

  const getEmpNameById = (id: string) => employees
    .find(({ $id }) => $id.value === id)?.文字列＿氏名.value || '';


  const {
    store,
    cocoAG1,
    cocoAG2,
    yumeAG1,
    yumeAG2,
    isDeleted,
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
    isDeleted: { value: isDeleted },
    storeId: { value: store },
    agents: {
      type: 'SUBTABLE',
      value: agents?.map(([type, empId])=>{
        return {
          id: '',
          value: {
            agentType: { value: type },
            employeeId: { value: empId },
            employeeName: { value: getEmpNameById(empId) }, // lookup copy field
            email: { value: 'auto' },
          },
        };
      }) || [],
    },
  };
};