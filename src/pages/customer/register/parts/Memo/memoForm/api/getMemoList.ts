import { APPIDS, KintoneRecord } from '../../../../../../../api/kintone';
import { MemoItemProps } from '../MemoContext';


export const getMemoList = async <T extends CustomerMemoTypes.SavedData>(recordId: string) => {
  console.log('Record id', recordId);
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
      }) =>{
        return (
          {
            memoId: $id.value,
            content: contents.value,
            createDate: createdTime.value,
            title: memoType.value,
            commenter: updater.value.name,
          } as MemoItemProps
        );
      });
  });

};