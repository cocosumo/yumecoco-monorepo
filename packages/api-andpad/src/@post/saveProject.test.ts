import format from 'date-fns/format';
import { getMyOrders } from '../@get';
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
    '案件名': '山田太郎テスト 様邸',
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

  /** 完成データを格納出来る */
  it('should save complete data', async () => {
    const completeData: Required<SaveProjectData> = {
      ...basicData,
      '顧客名': '試行',
      '顧客名（カナ）': 'テスト',
      '顧客メールアドレス': 'cocosumo.rpa03@gmail.com',
      '顧客担当者名': 'テスト',
      '顧客郵便番号': '4418124',
      '顧客現住所': '豊橋市野依著字山中',
      '顧客電話番号1': '0123456789',
      '顧客電話番号2': '9876543210',

      '案件名': '豊田店 テスト',
      '案件フロー': '契約前',
      '案件種別': '新築',

      '物件住所': '愛知県豊橋市',
      '物件住所種別': '新しい住所を入力する',
      '物件種別': 'その他',
      '物件郵便番号': '4418124',

      '契約日(実績)': format(new Date(), 'yyyy/MM/dd'),
      '顧客都道府県': '愛知県',
      '物件都道府県': '愛知県',
    };

    const result = await saveProject(completeData);

    console.log('result', result);

    const getResult = await getMyOrders({
      limit: 1,
      q: `案件名 = ${completeData.案件名}`,
    });

    console.log(JSON.stringify(getResult, null, 2));

    expect(getResult.data.objects.length).toBe(1);
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