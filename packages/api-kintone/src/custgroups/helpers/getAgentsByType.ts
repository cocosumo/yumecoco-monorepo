import { TAgents } from 'types';
import { RecordType } from '../config';

export const getAgentsByType = (
  agents: RecordType['agents'],
  type: TAgents,
) => agents?.value
  ?.filter(
    ({ 
      value: { agentType }, 
    }) => (agentType.value as TAgents) === type as TAgents,
  );