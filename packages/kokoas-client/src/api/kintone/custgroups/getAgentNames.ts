import { EmployeeType } from '../../../types/commonTypes';
import { saveCustGroup } from './saveCustGroup';

export const getAgentNames = (
  record: Parameters<typeof saveCustGroup>[0]['record'],
  employeeType: EmployeeType,
) => {
  return record.agents?.value
    .filter(({ value: { agentType } }) => agentType.value === employeeType )
    .map(({ value: { employeeName } })=> employeeName.value)
    .join(', ') || '';
};