
import { prospect } from './prospect_6343185/prospect';
import { renderContractList } from './renderContractList/renderContractList';
import { renderCumulative } from './renderCumulative/renderCumulative';
import { renderSchedule } from './renderSchedule/renderSchedule';

interface EventType {
  appId: number,
  records: DB.SavedRecord[],
  viewId: number,
}

export const indexShow = (event: EventType) => {
  const {
    viewId,
  } = event;

  console.log(event);

  switch (viewId) {
    case 6343120: // 契約累積表　開発環境
    case 6343118: // 契約累積表
      renderCumulative();
      break;
    case 6343211: // 見込み一覧　dev
    case 6343185: // 見込み一覧
      prospect();
      break;
    case 6343230: // 契約一覧表　開発環境
    case 6343246: // 契約一覧表
      renderContractList();
      break;
    case 6343616: // スケジュール 開発環境
    case 6343614: // スケジュール 本番
      renderSchedule();
      break;
  
  }
};