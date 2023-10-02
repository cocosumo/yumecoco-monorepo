import { renderContractList } from './renderContractList/renderContractList';
import { renderCumulative } from './renderCumulative/renderCumulative';

interface EventType {
  appId: number,
  records: DB.SavedRecord[],
  viewId: number,
}

export const indexShow = (event: EventType) => {
  const {
    viewId,
  } = event;

  switch (viewId) {
    case 6343120: // 契約累積表　開発環境
    case 6343118: // 契約累積表
      renderCumulative();
      break;
    case 6343230: // 契約一覧表　開発環境
    case 6343246: // 契約一覧表
      renderContractList();
  }
};