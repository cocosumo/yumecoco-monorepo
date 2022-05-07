import { APPIDS, KintoneRecord } from '../../../../../../../api/kintone';
import { MemoFormType } from '../form';


export const getMemoList = async <T extends CustomerMemoTypes.SavedData>(recordId: string) => {
  if (!recordId) throw new Error('Please provide record id.');
  return KintoneRecord.getAllRecords({
    app: APPIDS.custMemo,
    condition: `${'recordId' as keyof T} = "${recordId}" `,
    orderBy: 'createdTime desc',
  }).then(res => {
    return (res as unknown as T[])
      .map(({
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
  });

};