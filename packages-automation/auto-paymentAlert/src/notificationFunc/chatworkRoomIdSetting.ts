import { IEmployees, IProjects } from 'types';
import { CwRoomIds } from '../../types/paymentReminder';
import { chatworkRooms } from '../../config';

/**
 * chatworkのルームIDを設定します
 */
export const chatworkRoomIdSetting = ({
  agents,
  employees,
}: {
  agents: IProjects['agents'] | undefined,
  employees: IEmployees[]
}) => {

  const chatworkRoomIds = agents?.value.filter(({ value }) => {
    return value.agentType.value === 'cocoAG';
  }).map(({ value: {
    agentId,
    agentName,
  } }) => {
    const chatworkRoomId = employees.find(({ uuid }) => uuid.value === agentId.value)
      ?.chatworkRoomId.value;

    return {
      //社員情報が見つからない場合はグループ通知へ飛ばす
      cwRoomId: chatworkRoomId || chatworkRooms.cocoasGroup,
      agentName: agentName.value,
    } as CwRoomIds;

  });


  return chatworkRoomIds || [{ cwRoomId: chatworkRooms.cocoasGroup, agentName: '取得に失敗しました' }];
};
