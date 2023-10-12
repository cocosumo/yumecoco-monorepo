import { ICustgroups, IEmployees, IProjects, TAgents } from 'types';
import { getDefaultEmployee } from '../form';

/**
 * KintoneのAGデータをスキーマに沿った成形に変換する
 */
export const convertProjAgentsToForm = ({
  agType,
  agents,
  employeeRecs,
  cgAgents,
}: {
  agents: IProjects['agents']['value'] | undefined,
  agType: TAgents
  employeeRecs: IEmployees[],
  cgAgents: ICustgroups['agents'],
}) => {

  const result = agents
    ?.filter(({ value: { agentId } }) => !!agentId.value)
    .map(({
      value: {
        agentId,
        empRole,
        agentName,
        agentType,
      },
    }) => {

      const agentRec = employeeRecs.find(({ uuid: _empId }) => _empId.value === agentId.value);
      const cgAgent = cgAgents.value.find(({ value: { employeeId } }) => employeeId.value === agentId.value)?.value;

      return ({
        ...getDefaultEmployee((agentType.value || cgAgent?.agentType.value || agType) as TAgents),
        empId: agentId.value,
        empRole: empRole?.value || agentRec?.役職.value || '',
        empName: agentName.value || cgAgent?.employeeName.value || agentRec?.文字列＿氏名.value || '',
      });
    }) || [];


  const hasLastValue = !!result.at(-1)?.empId;

  // add field if empty or last value is not empty, up to 2
  if (!result.length || (hasLastValue && result.length < 2)) {
    result.push(getDefaultEmployee(agType));
  }


  return result;

};
