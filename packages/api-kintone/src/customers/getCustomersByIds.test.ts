import { RecordType } from './config';
import { getCustomersByIds } from './getCustomersByIds';


describe('getCustomersByIds', () => {
  const testIds = ['116', '117', '118']; // 存在している顧客番号配列
  let result: RecordType[]; 

  beforeAll(async () => {
    result = await getCustomersByIds(testIds);
    return result;
  });

  it('should get customers by existing id array', async ()=>{
    /* 存在している顧客番号配列で顧客データが取得出来た */
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        $id: expect.objectContaining({
          type: expect.any(String),
          value: expect.any(String),
        }),
      }),
    ]));

  });

  it('should match length of input ids', ()=>{
    /* 取得された顧客データはインプットと同じ数である */
    expect(result.length).toEqual(testIds.length);
  });

});
