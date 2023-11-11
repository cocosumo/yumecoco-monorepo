import { TAgents } from 'types';
import { RecordType } from '../config';

export const groupAgentNamesByType = (agents: RecordType['agents'] | undefined) => {

  const initial: Record<TAgents, string> =  {
    yumeAG: '',
    cocoAG: '',
    cocoConst: '',
  };

  if (!agents) return initial;

  return agents?.value.reduce(
    (acc, cur) => {
      const { agentType } = cur.value;
      const type = agentType.value as TAgents;
      const agentName = cur.value.employeeName.value;
      if (acc[type]) {
        acc[type] += agentName ? `、${agentName}` : '' ;
      } else {
        acc[type] = agentName;
      }
      return acc;
    }, 
    initial,
  );
  
};