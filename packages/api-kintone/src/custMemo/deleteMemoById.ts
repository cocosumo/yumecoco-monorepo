import { ktRecord } from '../client';
import { appId } from './config';

export const deleteMemoById = async (memoId: string) => {
  return (await ktRecord()).deleteRecords({
    app: appId,
    ids: [memoId],
  });
};