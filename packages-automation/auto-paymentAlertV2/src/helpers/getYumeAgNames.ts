import { RecordType } from 'api-kintone/src/projects/config';
import { TAgents } from 'types';

export const getYumeAgNames = ({
  agents,
}: {
  agents: RecordType['agents'] | undefined,
}) => {

  return agents?.value
    .filter(({ value: { agentType, agentName } }) =>
      (agentType.value === 'yumeAG' as TAgents) && (agentName.value))
    .map(({ value }) => value.agentName.value)
    .join(', ');
};
