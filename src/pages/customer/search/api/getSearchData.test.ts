import { getSearchData } from './getSearchData';

test('Fetch Search Data', async ()=>{

  const result = await getSearchData({
    storeId: undefined,
    custName: undefined,
  });

  console.log(result.normalizedData.length);
  expect(result).toMatchSnapshot();
});