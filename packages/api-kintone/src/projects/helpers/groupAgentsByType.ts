import { TAgents } from 'types';
import { RecordType } from '../config';

export const groupAgentsByType = (
  agents: RecordType['agents'],
) => {
  return agents?.value.reduce(
    (acc, cur) => {
      const { agentType } = cur.value;
      const type = agentType.value as TAgents;
      if (acc[type]) {
        acc[type].push(cur);
      } else {
        acc[type] = [cur];
      }
      return acc;
    }, 
    {} as Record<TAgents, RecordType['agents']['value']>,
  );
  
};