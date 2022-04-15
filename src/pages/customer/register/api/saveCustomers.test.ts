import { saveCustomers } from './saveCustomers';
import { testData } from './test/testData';


test('Save', async ()=>{
  expect(await saveCustomers(testData)).toMatchSnapshot();
});