import { SaveProjectData } from '../types';
import { saveProject } from './saveProject';

/**
 * 必要に応じて、ケースを増やします。
 *
 * テスト名：山田太郎 様邸
 * https://work.andpad.jp/our/orders?keyword=%E5%B1%B1%E7%94%B0%E5%A4%AA%E9%83%8E%20%E6%A7%98%E9%82%B8&order=asc&sort=state
 *
 */
describe('saveProject', () => {

  const basicData: SaveProjectData = {
    '案件管理ID': 'anken-test-only2',
    '案件名': '山田太郎 様邸',
    '顧客管理ID': 'cust-test-only',
    '顧客名': '山田太郎 様',
    '物件名': '山田太郎 様邸',
    '物件管理ID': 'bukken-test-only',
    'ラベル:工事内容': '新築',
    'ラベル:店舗': '豊田店',
  };

  /** 最低限の情報で保存出来るように。 */
  it('should save test project　with required information', async () => {
    const result = await saveProject(basicData);

    console.log(result);

    expect(result).toBeDefined();
  });


  /** ラベル:工事内容 のリストにないもの指定すると、失敗する */
  it('should fail when provided 工事内容 is not in the list', async () => {

    await expect(saveProject({
      ...basicData,
      'ラベル:工事内容': 'Error Test',
    } as any))
      .rejects
      .toThrow();
  });
});