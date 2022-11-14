import { getCustGroupByProjId } from './getCustGroupByProjId';

test('Get CustGroup by Project Id', async ()=>{
  const testId = '118'; // 存在している工事番号
  const result = await getCustGroupByProjId(testId);

  expect(result).toEqual(expect.arrayContaining([
    expect.objectContaining({
      $id: expect.objectContaining({
        type: expect.any(String),
        value: expect.any(String),
      }),
    }),
  ]));
});