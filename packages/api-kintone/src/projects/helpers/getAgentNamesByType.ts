import { TAgents } from 'types';
import { RecordType } from '../config';
import { getAgentsByType } from './getAgentsByType';

export const getAgentNamesByType = (
  agents: RecordType['agents'],
  type: TAgents,
) => getAgentsByType(agents, type)
  .map(({ value: { agentName } }) => agentName.value)
  .join(', ');