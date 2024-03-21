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
  } }) => agentName.value !== '' && agentType.value === 'cocoAG');

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

  // エリア毎の経理担当者を追加する
  if (recProj.territory.value === '東') {
    recEmployees.reduce((acc, {
      affiliation,
      職種,
      状態,
      chatworkRoomId,
    }) => {

      if (affiliation.value === 'ここすも' && 職種.value === '経理' && 状態.value === '有効') {
        acc.push(chatworkRoomId.value);
      }
      return acc;

    }, cwRoomId);

  } else {
    recEmployees.reduce((acc, {
      affiliation,
      職種,
      状態,
      territory_v2: territory,
      chatworkRoomId,
    }) => {

      if (affiliation.value === 'ここすも' && 職種.value === '経理' && 状態.value === '有効' && territory.value === '西') {
        acc.push(chatworkRoomId.value);
      }
      return acc;
    }, cwRoomId);
  }

  return cwRoomId;
};
