
import { TAgents } from 'types';
import { saveCustGroup } from './saveCustGroup';


export const getAgentNames = (
  record: Parameters<typeof saveCustGroup>[0]['record'],
  employeeType: TAgents,
) => {
  return record.agents?.value
    .filter(({ value: { agentType } }) => agentType.value === employeeType )
    .map(({ value: { employeeName } })=> employeeName.value)
    .join(', ') || '';
};