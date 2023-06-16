import { SaveProjectData } from '../types';
import { getMyOrders } from './getMyOrders';

describe('getMyOrders', () => {
  it('should get my orders', async () => {

    const result = await getMyOrders();

    console.log(JSON.stringify(result, null, 2));

    expect(result).toBeDefined();
  });

  it('should get orders by limit', async () => {
    const limit = 1;
    const result = await getMyOrders({ limit });

    console.log(JSON.stringify(result, null, 2));

    expect(result.data.objects.length).toBe(limit);
  });

  it('should get orders using LIKE operator', async () => {

    const result = await getMyOrders({ q: '案件名　LIKE　岩川竜也様' });

    console.log(JSON.stringify(result, null, 2));

    expect(result.data.objects.length).toBeGreaterThan(0);
  });


  it('should get orders by 案件名 with = operator', async () => {
    const value = 'ここすも豊川店　テスト様邸　ご新築工事'; // 既存しているのを要確認
    const result = await getMyOrders({ q: `案件名 = ${value}` });

    console.log(JSON.stringify(result, null, 2));

    expect(result.data.objects.length).toBe(1);
  });


  it('should get orders by 案件管理ID', async () => {
    const value = 'anken-test-only2';
    const result = await getMyOrders({ q: `案件管理ID = ${value}` });

    console.log(JSON.stringify(result, null, 2));

    expect(result.data.objects.length).toBe(1);
  });

  it('should get orders by 案件フロー', async () => {
    const value = '契約前';
    const result = await getMyOrders({ q: `案件フロー = ${value}` });

    console.log('COUNT', result.data.total);

    expect(result.data.objects.length).toBeDefined();
  });

  it('should get orders with aditional property: 顧客メールアドレス', async () => {
    const value = 'anken-test-only2';
    const additionalProperty: keyof SaveProjectData = '案件フロー';
    const result = await getMyOrders({ q: `案件管理ID = ${value}`, series: [additionalProperty] });

    console.log(result.data.objects );

    expect(Object.keys(result.data.objects[0]).includes(additionalProperty)).toBe(true);

  });
});