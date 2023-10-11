import { RecordType } from 'api-kintone/src/projects/config';
import { TAgents } from 'types';

export const getYumeAgNames = ({
  agents,
  yumeAGNames,
}: {
  agents: RecordType['agents'] | undefined,
  yumeAGNames: string,
}) => {

  const yumeAgents = agents?.value.filter(({ value }) => {
    const {
      agentType,
    } = value;

    return agentType.value === 'yumeAG' as TAgents;
  });

  if (yumeAgents) {
    console.log('夢てつAG', yumeAgents);
    if (yumeAgents.length >= 1) {
      return yumeAgents.map(({ value }) => value.agentName.value).join(', ');
    }
  }
  console.log('旧式で取得', yumeAGNames);

  return yumeAGNames;
};
