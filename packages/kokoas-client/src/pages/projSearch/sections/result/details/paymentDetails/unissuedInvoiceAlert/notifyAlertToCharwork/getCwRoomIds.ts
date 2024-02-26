import { IEmployees, IProjects } from 'types';
import { chatworkRooms } from '../alertConfig';



export const getCwRoomIds = ({
  recProj,
  recEmployees,
}: {
  recProj: IProjects
  recEmployees: IEmployees[]
}) => {

  const cocoAgs = recProj.agents.value.filter(({ value: {
    agentName,
    agentType,
  } }) => agentName.value !== '' && agentType.value === 'cocoAg');

  // chatworkのルームIDを取得する
  const cwRoomId = [] as string[];
  for (const cocoAg of cocoAgs) {
    const tgtEmployee = recEmployees?.find(({ uuid }) => uuid.value === cocoAg.value.agentId.value);
    if (tgtEmployee) {
      cwRoomId.push(tgtEmployee?.chatworkRoomId.value);
    }
  }

  // 担当者が取得できなかった場合は、グループチャットへ送信する
  if (cwRoomId.length < 1) {
    cwRoomId.push(chatworkRooms.cocoasGroup);
  }

  return cwRoomId;
};
