import { ICustgroups, IEmployees, TAgents } from 'types';
import { getDefaultEmployee } from '../form';

export const convertCustGroupAgentsToForm = ({
  agType,
  agents,
  employeeRecs,
}: {
  agents: ICustgroups['agents']['value'] | undefined,
  agType: TAgents
  employeeRecs: IEmployees[],
}) => {

  const result = agents
    ?.filter(({ value: { employeeId } }) => !!employeeId.value)
    .map(({
      value: {
        agentType,
        employeeId,
        employeeName,
      },
    }) => {

      const agentRec = employeeRecs.find(({ uuid: _empId }) => _empId.value === employeeId.value);

      return ({
        ...getDefaultEmployee((agentType.value || agentType.value || agType) as TAgents),
        empId: employeeId.value,
        empRole: agentRec?.役職.value || '',
        empName: employeeName.value || agentRec?.文字列＿氏名.value || '',
      });
    }) || [];

  // 二つまで選択出来る。加減はこちららで行う。
  // よく変わるものなら、マスター設定に実装し、そこから取得する。
  const maxNumOfAgents = 2;
  while (result.length < maxNumOfAgents) {
    result.push(getDefaultEmployee(agType));
  }

  return result;

};