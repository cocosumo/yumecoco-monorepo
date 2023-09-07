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
    case 6343118: // 契約累積表
      renderCumulative();
  }
};