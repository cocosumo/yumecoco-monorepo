import { getEmployees } from 'api-kintone';
import { AutoCompleteOption } from '../components/AutoComplete';
import { EmpAffiliations, EmpRoles } from 'types';

interface EmployeesOption extends AutoCompleteOption {
  affiliation: EmpAffiliations,
  role: EmpRoles,
}

const employees : EmployeesOption[] = [];

export const fetchEmployees = async () : Promise<EmployeesOption[]> => {
  if (employees.length > 0) return employees;

  return (await getEmployees(true, ['有効', '保留(退職済)']))
    .map(({
      uuid,
      文字列＿氏名: employeeName,
      役職: role,
      affiliation,
    }) => ({
      label: employeeName.value,
      id: uuid.value,
      affiliation: affiliation.value as EmpAffiliations,
      role: role.value as EmpRoles,
    }));
};
