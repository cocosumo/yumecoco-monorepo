import { APP_ID } from './config';
import { KintoneRecord } from './../config';

export const getAllMemosByGroupId = (groupId: string | undefined | null) => {
  return KintoneRecord.getAllRecords({
    app: APP_ID,
    condition: `groupId = "${groupId}" `,
    orderBy: 'createdTime desc',
  });
};