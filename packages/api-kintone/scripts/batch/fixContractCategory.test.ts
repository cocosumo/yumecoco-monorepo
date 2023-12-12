import { expect, it } from '@jest/globals';
import { AppIds } from 'config';
import { IContracts } from 'types';
import { KintoneClientBasicAuth } from './settings';

/**
 * 
 * 
 * 範囲
 *  - 「カテゴリー」がない契約
 * 修正内容
 *  - カテゴリーを「契約」に設定する
 *  - 工事番号へルークアップを更新する
 * 
 * @see https://rdmuhwtt6gx7.cybozu.com/k/236/show#record=278
 */
it('should', async () => {

  const KintoneRecord = KintoneClientBasicAuth.record;

  // 「カテゴリー」がない契約を取得
  const records = await KintoneRecord.getAllRecords({
    app: AppIds.contracts,
    condition: 'contractType = ""', 
  }) as unknown as IContracts[];

  const someHasCategory = records.some((r) => !!r.contractType.value);
  
  expect(someHasCategory).toBe(false);
  
  const newRecords = records.map<{
    id: string,
    record: Partial<IContracts>
  }>((r) => ({
    id: r.$id.value,
    record:{
      contractType: {
        value: '契約',
      },
      projId: {
        value: r.projId.value,
      },
    },
  }));

  console.log(newRecords.length);


  /*   const updated = await KintoneRecord.updateAllRecords({
    app: AppIds.contracts,
    records: newRecords,
  });
 
  console.log(updated); */
  
}, 1000000);
