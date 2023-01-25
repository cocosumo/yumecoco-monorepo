import { saveProject } from './saveProject';

describe('saveProject', () => {
  it('should save test project', async () => {
    const result = await saveProject({
      '案件管理ID': 'anken-test-only',
      '案件名': '山田太郎 様邸',
      '顧客管理ID': 'cust-test-only',
      '顧客名': '山田太郎 様',
      '物件名': '山田太郎 様邸',
      '物件管理ID': 'bukken-test-only',
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});