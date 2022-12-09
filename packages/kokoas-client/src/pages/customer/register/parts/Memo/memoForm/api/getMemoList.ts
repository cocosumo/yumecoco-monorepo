import { getMemosByCustGroupId } from 'api-kintone';
import { MemoFormType } from '../form';

export const getMemoList = async (recordId: string) => {
  if (!recordId) throw new Error('Please provide record id.');

  const memoRecs = await getMemosByCustGroupId(recordId);

  return memoRecs.map(({
    uuid: custId,
    contents,
    memoType,
    createdTime,
    更新者: updater,
    custGroupId,
  }) =>{
    return (
      {
        custGroupId: custGroupId.value,
        memoId: custId.value,
        contents: contents.value,
        createDate: createdTime.value,
        memoType: memoType.value,
        commenter: updater.value.name,
      } as MemoFormType
    );
  });

};