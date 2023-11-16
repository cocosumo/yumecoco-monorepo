import { RecordType } from 'api-kintone/src/projects/config';
import { TAgents } from 'types';

export const getYumeAgNames = ({
  agents,
}: {
  agents: RecordType['agents'] | undefined,
}) => {

  const yumeAgents = agents?.value.filter(({ value }) => {
    const {
      agentType,
      agentName,
    } = value;

    return (agentType.value === 'yumeAG' as TAgents) && agentName.value !== '';
  });

  if (yumeAgents?.length) {
    return yumeAgents.map(({ value }) => value.agentName.value).join(', ');
  }

  return '取得に失敗しました';
};
