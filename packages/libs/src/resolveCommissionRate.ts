import { groupAgentsByType as projGroupAgentsByType } from 'api-kintone/src/projects/helpers/groupAgentsByType';
import { groupAgentsByType as custGroupAgentsByType } from 'api-kintone/src/custgroups/helpers/groupAgentsByType';

import { ICustgroups, IEmployees, IProjects, IProjtypes } from 'types';

interface IAgent {
  empId: string;
  empName: string;
  empRole: string;
}

/** 紹介料率を取得する */
export const resolveCommisionRate = ({
  projRec,
  custGroupRec,
  projTypeRec,
  empRecs,
}: {
  custGroupRec: ICustgroups;
  projRec: IProjects;
  empRecs: IEmployees[];
  projTypeRec: IProjtypes | undefined;
}) => {
  console.log('resolveCommisionRate');

  if (!projTypeRec) return 0;

  const { 
    agents: projAgents, 
    commissionRate, 
  } = projRec;

  const { agents: custGroupAgents } = custGroupRec;

  const {
    /** 個別紹介率 */
    commRateByEmpList,

    /** ゆめてつ紹介率 */
    commRateByRoleList,

    /** 規定紹介率 */
    yumeCommFeeRate: defaultCommRate,
  } = projTypeRec;

  let yumeAGs: IAgent[] = [];

  const pAg = projGroupAgentsByType(projAgents);


  
  const cgAg = custGroupAgentsByType(custGroupAgents);

  // 変換する
  if (pAg?.yumeAG?.length) {
    yumeAGs = pAg.yumeAG.map(({ value: { agentId, agentName, empRole } }) => {
      const empRec = empRecs.find(
        ({ uuid: empId }) => empId.value === agentId.value,
      );

      return {
        empId: agentId.value,
        empName: agentName.value,
        empRole: empRole.value || empRec?.役職.value || '',
      };
    });
  } else if (cgAg?.yumeAG?.length) {
    yumeAGs = cgAg.yumeAG.map(({ value: { employeeId, employeeName } }) => {
      const empRec = empRecs.find(
        ({ uuid: empId }) => empId.value === employeeId.value,
      );

      return {
        empId: employeeId.value,
        empName: employeeName.value,
        empRole: empRec?.役職.value || '',
      };
    });
  }

  const hasNoYumeAG = !yumeAGs.length // ゆめてつAGがいない、
  || yumeAGs.some(({ empName }) => empName === 'ここすも'); // 又は、ゆめてつAGに設定はあるが、「ここすも」になっている


  if (commissionRate.value) {
    // 工事内容で設定してある場合、それを使う
    const parsedCommRate = +commissionRate.value;
    console.log('工事データにある紹介率：', parsedCommRate, commissionRate.value);
    return parsedCommRate;
  }

  if (hasNoYumeAG) {
    // ゆめてつAGがいない場合、紹介率は0
    console.log('紹介率：ゆめてつAGがいなので、0');
    return 0;
  }

  const matchedCommRateByEmp = commRateByEmpList.value.find(
    ({ value: { empId: ptEmpId } }) => {
      return yumeAGs.some(({ empId }) => empId === ptEmpId.value);
    },
  );
  if (matchedCommRateByEmp) {
    // 個別紹介率の設定と一人でも一致する場合、それを使う
    const parsedCommRate = +matchedCommRateByEmp.value.commRateByEmp.value;
    console.log('個別紹介率', parsedCommRate);
    return parsedCommRate;
  }

  const matchedCommRateByRole = commRateByRoleList.value.find(
    ({ value: { role } }) => {
      return yumeAGs.some(({ empRole }) => empRole === role.value);
    },
  );
  if (matchedCommRateByRole) {
    // ゆめてつAGの役職と一致する場合、それを使う
    const parsedCommRate = +matchedCommRateByRole.value.commRateByRole.value;
    console.log('役職紹介率', parsedCommRate);
    return parsedCommRate;
  }

  const parsedDefaultCommRate = +defaultCommRate.value;
  console.log('紹介率：設定なし', parsedDefaultCommRate);

  return parsedDefaultCommRate;
};
