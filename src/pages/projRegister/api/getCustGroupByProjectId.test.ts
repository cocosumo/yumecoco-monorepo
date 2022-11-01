import { getCustGroupByProjectId } from './getCustGroupByProjectId';

test('Get CustGroup by Project Id', async ()=>{
  const result = await getCustGroupByProjectId('97');

  console.log(result.length);
  expect(result).toMatchSnapshot();
});