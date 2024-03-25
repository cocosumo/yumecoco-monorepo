import { alertIssuer } from '../alertConfig';
import { useEmployees } from 'kokoas-client/src/hooksQuery';



/** アラート発行の担当者かどうかを確認する */
export const useAlertIssuer = () => {
  const { data: employees } = useEmployees();

  if (!employees) return false;

  const loginUserId = kintone.getLoginUser().employeeNumber;
  const isCocoEmp = employees.find(({ $id }) => $id.value === loginUserId);

  if (!isCocoEmp) return false;

  // 経理担当者もしくはシステム担当者
  if (alertIssuer.includes(isCocoEmp.職種.value)) return true;

  return false;
};
