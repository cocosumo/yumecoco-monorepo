import { getAllRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getCompletedTickets = async () => {
  const orderByField: RecordKey = 'completedTime';
  const scope: RecordKey = 'scope';  
  const announcementTitle: RecordKey = 'announcementTitle';
  const status = '完了';

  const conditions = [
    `ステータス="${status}"`,
    `${scope} in ("ここあす")`,
    `${announcementTitle} != ""`,
  ].join(' and ');

  return getAllRecords<RecordType>({
    app: appId,
    condition: `${conditions}`,
    orderBy: `${orderByField} desc`,
  });
};