import { client } from './client';
import { AppIds } from 'config';


it('should be able access kintone', async () => {
  const kintoneClient = await client();

  /* これでアクセス出来るかどうかテスト。 */
  const result = await kintoneClient.record.getRecords({
    app: AppIds.employees,
  });

  console.log('Retrieved ', result);

  expect(result).toHaveProperty('records');
});