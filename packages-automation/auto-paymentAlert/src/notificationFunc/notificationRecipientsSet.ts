import { IProjects, IUser } from 'types';

export const notificationRecipientsSet = ({
  agents,
  users,
}: {
  agents: IProjects['agents'] | undefined
  users: IUser[]
}) => {

  return agents?.value.filter(({ value }) => {
    return value.agentType.value === 'cocoAG';
  }).map(({
    value: {
      agentName,
    },
  }) => {
    const userDat = users.find(({
      surName,
      givenName,
    }) => {
      return (agentName.value.indexOf(surName) !== -1) && (agentName.value.indexOf(givenName) !== -1);
    });

    return ({
      code: userDat?.code || '',
      name: userDat?.name || '',
    });
  }) || [{
    code: '',
    name: '',
  }];
};
