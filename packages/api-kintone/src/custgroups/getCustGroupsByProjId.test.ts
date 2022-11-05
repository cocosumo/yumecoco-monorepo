import { getCustGroupsByProjId } from './getCustGroupsByProjId';

test('Get CustGroup by Project Id', async ()=>{
  const testData = '97';
  const result = await getCustGroupsByProjId(testData);

  console.log(JSON.stringify(result, null, 2));

  expect(result).toEqual(expect.arrayContaining([
    expect.objectContaining({
      $id: expect.objectContaining({
        type: expect.any(String),
        value: expect.any(String),
      }),
    }),
  ]));
});