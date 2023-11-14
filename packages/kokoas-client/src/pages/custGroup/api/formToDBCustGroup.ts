import { ICustgroups, ICustomers, IEmployees } from 'types';
import { TForm } from '../schema';

export const formToDBCustGroup = ({
  formData,
  employees,
  savedCustomers,
}:{
  formData: TForm,
  employees: IEmployees[],
  savedCustomers: Partial<ICustomers>[],
}): Partial<ICustgroups> => {


  const {
    store,
    cocoAG1,
    cocoAG2,
    yumeAG1,
    yumeAG2,
    isDeleted,
    memo,
    customers,
  } = formData;

  const getEmpNameById = (id: string) => employees
    .find(({ uuid }) => uuid.value === id)?.文字列＿氏名.value || '';

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
    members : {
      type: 'SUBTABLE',
      value: customers?.map(({ custName, isSameAddress }, index) => {
        const customerRec = savedCustomers.find(({ fullName }) => fullName?.value === custName);

        return {
          id: '', // this is auto-populated
          value: {
            postal: { value: 'auto' },
            address1: { value: 'auto' },
            address2: { value: 'auto' },
            customerName: { value: 'auto' },
            custId: { value: customerRec?.uuid?.value || '' },
            custNameReading: { value: 'auto' },
            index: { value: String(index) },
            isSameAsMain: { value: String(+isSameAddress) },
          },
        };
      }),
    },
    agents: {
      type: 'SUBTABLE',
      value: agents?.map(([type, empId])=>{
        return {
          id: '',
          value: {
            agentType: { value: type },
            employeeId: { value: empId },
            employeeName: { value: getEmpNameById(empId) },
            email: { value: 'auto' },
          },
        };
      }) || [],
    },
  };
};