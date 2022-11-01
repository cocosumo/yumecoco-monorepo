import { MemoFormType } from '../form';
import { APPIDS, KintoneRecord } from '../../../../../../../api/kintone';

export const deleteMemo = (params: MemoFormType) => {
  console.log('deletememo props', params);
  if (!params.memoId) throw new Error('Please provide id to delete!');

  return KintoneRecord.deleteRecords({
    app: APPIDS.custMemo,
    ids: [params.memoId],
  });

};