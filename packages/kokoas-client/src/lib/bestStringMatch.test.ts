import { BuildingTypesAndpad, buildingTypesAndpad, projectTypesAndpad, storeNamesAndpad } from 'api-andpad';
import { getAllStores, getProjTypes } from 'api-kintone';
import { BuildingType } from 'types';
import { bestStringMatch } from './bestStringMatch';
import { describe, it, expect } from '@jest/globals';

describe('bestStringMatch', () => {
  const cases : [BuildingType, BuildingTypesAndpad][] = [
    ['その他', 'その他'],
    ['マンション', 'マンション'],
    ['店舗/事務所', '店舗'],
    ['戸建て', '戸建'],
  ];
  const compareArray = [...buildingTypesAndpad];

  test.each(cases)('%s of cocoas should be %s in andpad', (testCase, expectedValue) => {
    const result = bestStringMatch(testCase, compareArray, {
      valueIfNoMatch: 'その他',
    });

    expect(result).toBe(expectedValue);
  });

  it('should return その他 when not in the list', () => {
    const result = bestStringMatch('NOTINLIST', compareArray, {
      valueIfNoMatch: 'その他',
    });

    expect(result).toBe('その他');
  });


  /** Integration Test
   *  Kintoneでは、フィールドの設定・取得は限られているので、取り合えず手動で確認
   *  本格的DBに移行したら、改修
   * */

  it('should return matching 工事種別', async () => {

    const result = (await getProjTypes())
      .map(({ label }) => [label.value, bestStringMatch(label.value, projectTypesAndpad, {
        valueIfNoMatch: 'その他',
      })]);

    console.log(`ANDPAD側の工事種別: ${projectTypesAndpad}`);
    console.log(result); // ここで確認

    expect(result.length).toBeGreaterThan(0);
  });

  it('should return matching 店舗名', async () => {
    const stores = await getAllStores();

    // Fails at 豊田大林店 where the match score is equal to 豊田中央店
    // This is because the score is calculated by the number of characters matched
    const result = (stores)
      .map(({ 店舗名: storeName }) => [storeName.value, bestStringMatch(storeName.value, storeNamesAndpad, { ignore: '店' })]);

    expect(result.length).toBeGreaterThan(0);
  });
});