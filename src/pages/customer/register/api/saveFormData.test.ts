import { saveFormData } from './saveFormData';
import { testData } from './test/testData';

test('Save', async ()=>{
  expect(await saveFormData(testData)).toMatchSnapshot();
});