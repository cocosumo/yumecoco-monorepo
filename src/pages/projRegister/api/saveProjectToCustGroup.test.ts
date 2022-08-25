import { saveProjectToCustGroup } from './saveProjectToCustGroup';

test('save project transaction', async ()=>{
  const result = await saveProjectToCustGroup('97', '152', ['hello']);
  expect(result).toMatchSnapshot();
});