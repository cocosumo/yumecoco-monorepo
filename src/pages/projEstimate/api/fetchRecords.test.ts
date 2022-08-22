import { fetchRecords } from './fetchRecords';

it('estimate', async () => {
  console.log(
    process.env.API_ESTIMATE_MAJORITEMS);
  const datas = await fetchRecords('majourItems');

  expect(datas).toMatchSnapshot();
}, 50000);