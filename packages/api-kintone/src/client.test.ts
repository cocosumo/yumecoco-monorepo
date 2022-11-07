import { ktClient, ktRecord } from './client';
import { AppIds } from 'config';


describe('Kintone client', () => {
  it('should be able access kintone by ktClient', async () => {
    const kintoneClient = await ktClient();
  
    /* これでアクセス出来るかどうかテスト。 */
    const result = await kintoneClient.record.getRecords({
      app: AppIds.employees,
    });
  
    console.log('Retrieved ', result.records.length);
  
    expect(result).toHaveProperty('records');
  });

  
  it('should be able access kintone by ktRecord', async () => {
    const kintoneRecord = await ktRecord();
  
    /* これでアクセス出来るかどうかテスト。 */
    const result = await kintoneRecord.getRecords({
      app: AppIds.employees,
    });
  
    console.log('Retrieved ', result.records.length);
  
    expect(result).toHaveProperty('records');
  });
});
