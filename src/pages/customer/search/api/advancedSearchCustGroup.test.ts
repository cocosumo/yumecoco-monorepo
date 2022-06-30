import { RecordID } from '@kintone/rest-api-client/lib/client/types';
import { Revision } from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { resolveRecordStatusQuery } from './advancedSearchCustGroup';

type TUpload = {
  id: RecordID;
  record?: Partial<Record<keyof CustomerGroupTypes.SavedData, any>> | undefined; // Kintone does export recordForParameter type
  revision?: Revision | undefined;
};

describe('advancedSearch', ()=>{
  test('recordStatus', ()=>{
    const result = resolveRecordStatusQuery(['情報登録のみ']);
    expect(result).toMatchSnapshot();
  }, 30000);


  test('updateProjCount', async ()=>{
    const records = await KintoneRecord.getAllRecords({
      app: APPIDS.custGroup,
    }) as unknown as CustomerGroupTypes.SavedData[];

    const updatedRecords = records.map<TUpload>((item) => {
      const updatedProjsCount = item.projects.value
        .filter((i) => i.value.constructionId.value);
      // console.log(item.$id.value, updatedProjsCount?.[0]?.value.constructionId.value);
      return {
        id: item.$id.value,
        record: {
          projectCount: { value:  updatedProjsCount.length.toString() },
        },
      };
    });



    await KintoneRecord.updateAllRecords({
      app: APPIDS.custGroup,
      records: updatedRecords as any,
    });
    expect(records).toMatchSnapshot();
  }, 30000);
});
