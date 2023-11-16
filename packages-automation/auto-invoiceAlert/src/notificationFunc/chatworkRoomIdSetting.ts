import { IEmployees, IProjects } from 'types';
import { CwRoomIds } from '../../types/InvoiceReminder';
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
    const {
      agentType,
      agentName,
    } = value;
    return (agentType.value === 'cocoAG') && (agentName.value !== '');
  }).map(({ value: {
    agentId,
    agentName,
  } }) => {
    const employee = employees.find(({ uuid }) => uuid.value === agentId.value);

    return {
      //社員情報が見つからない場合はグループ通知へ飛ばす
      cwRoomId: employee?.chatworkRoomId.value || chatworkRooms.cocoasGroup,
      agentId: employee?.uuid.value,
      agentName: agentName.value,
    } as CwRoomIds;

  });


  return chatworkRoomIds || [{
    cwRoomId: chatworkRooms.cocoasGroup,
    agentId: '',
    agentName: '取得に失敗しました',
  }];
};
