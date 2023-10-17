import { TAgents } from 'types';
import { RecordType } from '../config';
import { getAgentsByType } from './getAgentsByType';

export const getAgentNamesByType = (
  agents: RecordType['agents'],
  type: TAgents,
) => getAgentsByType(agents, type)
  .filter(({ value: { agentName } }) => !!agentName.value)
  .map(({ value: { agentName } }) => agentName.value)
  .join(', ');