import { ICustgroups, IEmployees, IProjects, IProjtypes } from 'types';
import { TForm } from '../schema';
import { convertCommRateByEmployee } from './convertCommRateByEmployee';
import { convertCommRateByRole } from './convertCommRateByRole';
import { resolveCommisionRate } from 'libs';

interface IGetPersistentFieldsParams {
  projRec: IProjects,
  projTypeRec: IProjtypes | undefined,
  custGroupRec: ICustgroups,
  hasContract: boolean,
  empRecs: IEmployees[],
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
  custGroupRec,
  empRecs,
}: IGetPersistentFieldsParams): Pick<TForm, 'commissionRate' | 'commRateByRole' | 'profitRate' | 'commRateByEmployee'> => {


  const {
    profitRate,
    commRateByRoleList,
    commRateByEmpList,
  } = projTypeRec || {};

  const {
    profitRate: profitRateFromProj,
    commRateByRoleList: commRateByRoleFromProj,
    commRateByEmpList: commRateByEmpFromProj,
  } = projRec;

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
    }));

  // If there's no contract, use Project Type's values

  const parsedProfitRate = profitRateFromProj.value || profitRate?.value || '';
  parsedCommRateByRoles = projHasCommRateByRole
    ? parsedCommRateByRoles
    : convertCommRateByRole(commRateByRoleList);

  parseCommRateByEmployee = projHasCommRateByEmployee
    ? parseCommRateByEmployee
    : convertCommRateByEmployee(commRateByEmpList);


  const commRate = resolveCommisionRate({
    custGroupRec,
    projRec,
    projTypeRec,
    empRecs,
  });




  return {
    commissionRate: commRate,
    profitRate: parsedProfitRate === '' ? 0 : Number(parsedProfitRate),
    commRateByRole: parsedCommRateByRoles,
    commRateByEmployee: parseCommRateByEmployee,
  };
};