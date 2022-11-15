import { getMemosByCustGroupId } from 'api-kintone';
import { MemoFormType } from '../form';

export const getMemoList = async (recordId: string) => {
  if (!recordId) throw new Error('Please provide record id.');

  const memoRecs = await getMemosByCustGroupId(recordId);

  return memoRecs.map(({
    $id,
    contents,
    memoType,
    createdTime,
    更新者: updater,
    recordId: recId,
  }) =>{
    return (
      {
        recordId: recId.value,
        memoId: $id.value,
        contents: contents.value,
        createDate: createdTime.value,
        memoType: memoType.value,
        commenter: updater.value.name,
      } as MemoFormType
    );
  });

};