import { IEmployees, IProjects, IUnissuedinvoicealert } from 'types';


export const getNotificationSettings = ({
  agents,
  recEmployees,
}: {
  agents: IProjects['agents']
  recEmployees: IEmployees[]
}): IUnissuedinvoicealert['notificationSettings'] => {

  const cocoAgs = agents.value.filter(({ value: {
    agentName,
    agentType,
  } }) => agentName.value !== '' && agentType.value === 'cocoAG')
    .map(({ value: { agentId } }) => agentId.value);


  const notificationSettings: IUnissuedinvoicealert['notificationSettings']['value'] =
    cocoAgs.map((agentId) => {
      const tgtEmpInfo = recEmployees.find(({ uuid }) => uuid.value === agentId);
      return {
        id: '',
        value: {
          alertTargetId: { value: agentId },
          alertTargetName: { value: tgtEmpInfo?.文字列＿氏名.value || '' },
          chatworkRoomId: { value: tgtEmpInfo?.chatworkRoomId.value || '' },
        },
      };
    });

  return ({
    type: 'SUBTABLE',
    value: notificationSettings,
  });
};
