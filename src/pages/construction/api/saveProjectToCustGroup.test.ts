import { saveProjectToCustGroup } from './saveProjectToCustGroup';

test('save project transaction', async ()=>{
  const result = await saveProjectToCustGroup('97', '152');
  expect(result).toMatchSnapshot();
});