import { saveProject } from './saveProject';

describe('saveProject', () => {
  it('should save test project', async () => {
    const result = await saveProject({
      '案件管理ID': 'abcdefg',
      '案件名': '安藤二郎様邸',
      '顧客管理ID': 'abcdefg',
      '顧客名': '安藤二郎様',
      '物件名': '安藤二郎様邸',
      '物件管理ID': 'abcdefg',
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});