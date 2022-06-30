import { getProjectsByCustGroupId } from './getProjectsByCustGroupId';


test('Projects Data', async ()=>{
  const result = await getProjectsByCustGroupId('9');
  console.log(result?.length, 'LENGTH');
  expect(result).toMatchSnapshot();
});