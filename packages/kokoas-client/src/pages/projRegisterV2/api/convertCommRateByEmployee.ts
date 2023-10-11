import { IProjtypes } from 'types';
import { TForm } from '../schema';

export const convertCommRateByEmployee = (
  commRateByEmpList: IProjtypes['commRateByEmpList'] | undefined,
): TForm['commRateByEmployee'] => {
  if (!commRateByEmpList) return [];

  return commRateByEmpList?.value
    .filter(({ value: { empId } }) => !!empId.value)
    .map(({ value: { empId, commRateByEmp, empName, empRole } }) => ({
      empId: empId.value,
      commEmpId: empId.value,
      commEmpName: empName.value,
      commEmpRole: empRole.value,
      commEmpRate: Number(commRateByEmp.value),
    }));
};