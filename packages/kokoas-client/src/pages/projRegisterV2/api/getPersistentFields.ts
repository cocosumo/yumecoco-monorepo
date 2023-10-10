import { IProjects, IProjtypes } from 'types';
import { TForm } from '../schema';

interface IGetPersistentFieldsParams {
  projRec: IProjects,
  projTypeRec: IProjtypes | undefined,
  hasContract: boolean,
}

/**
 * Data that relies on foreign table/app
 * but must persist even the source is 
 * deleted or changed
 * 
 * 店舗情報、
 * 工事種別情報、
 * 紹介料率、
 * 利益率、
 * 役職による紹介料率、
 * 個別紹介料率、
 * 
 */
export const getPersistentFields = ({
  projTypeRec,
  projRec,
  hasContract,
}: IGetPersistentFieldsParams): Pick<TForm, 'commissionRate' | 'commRateByRole' | 'profitRate' | 'commRateByEmployee'> => {

  const {
    yumeCommFeeRate,
    profitRate,
    commRateByRoleList,
    commRateByEmpList,
  } = projTypeRec || {};

  const {
    commissionRate: commissionRateFromProj,
    profitRate: profitRateFromProj,
    commRateByRoleList: commRateByRoleFromProj,
    commRateByEmpList: commRateByEmpFromProj,
  } = projRec;

  // Default to project records values
  let parsedCommRate: string = commissionRateFromProj.value;
  let parsedProfitRate: string = profitRateFromProj.value;

  // 役職による紹介料率
  const filteredCommRateByRole = commRateByRoleFromProj?.value
    .filter(({ value: { role } }) => !!role.value);

  const projHasCommRateByRole = filteredCommRateByRole.length > 0;

  let parsedCommRateByRoles: TForm['commRateByRole'] | null = projHasCommRateByRole
    ? filteredCommRateByRole
      .map(({
        value: { role, commRateByRole },
      }) => ({
        role: role.value,
        rate: Number(commRateByRole.value),
      }))
    : [];

  // 個別紹介料率
  const filteredCommRateByEmployee = commRateByEmpFromProj?.value
    .filter(({ value: { commEmpId } }) => !!commEmpId.value);

  const projHasCommRateByEmployee = filteredCommRateByEmployee.length > 0;

  let parseCommRateByEmployee: TForm['commRateByEmployee'] = filteredCommRateByEmployee
    .map(({ value: { commEmpId, commRateByEmp, commEmpName, commEmpRole } }) => ({
      empId: commEmpId.value,
      commEmpId: commEmpId.value,
      commEmpName: commEmpName.value,
      commEmpRate: Number(commRateByEmp.value),
      commEmpRole: commEmpRole.value,
      //commEmpRole:  ,
      //rate: Number(commRateByEmp.value),
    }));

  if (!hasContract) {
    // If there's no contract, use Project Type's values
    parsedCommRate = parsedCommRate || yumeCommFeeRate?.value || '';
    parsedProfitRate = parsedProfitRate || profitRate?.value || '';
    parsedCommRateByRoles = projHasCommRateByRole
      ? parsedCommRateByRoles
      : commRateByRoleList?.value
        .filter(({ value: { role } }) => !!role.value)
        .map(({
          value: { role, commRateByRole },
        }) => ({
          role: role.value,
          rate: Number(commRateByRole.value),
        }))
      || [];

    parseCommRateByEmployee = projHasCommRateByEmployee
      ? parseCommRateByEmployee
      : commRateByEmpList?.value
        .filter(({ value: { empId } }) => !!empId.value)
        .map(({ value: { empId, commRateByEmp, empName, empRole } }) => ({
          empId: empId.value,
          commEmpId: empId.value,
          commEmpName: empName.value,
          commEmpRole: empRole.value,
          commEmpRate: Number(commRateByEmp.value),
        })) || [];

  }

  // If there's no value, set to null to avoid validation error
  return {
    commissionRate: parsedCommRate === '' ? 0 : Number(parsedCommRate),
    profitRate: parsedProfitRate === '' ? 0 : Number(parsedProfitRate),
    commRateByRole: parsedCommRateByRoles,
    commRateByEmployee: parseCommRateByEmployee,
  };
};