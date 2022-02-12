
import 'regenerator-runtime/runtime';
import { custFormStateTestData } from '../../../helpers/test/testData';


import  addTransactCustomers from './addTransactCustomers';

describe('Submit', () => {
  test('is successful', async () => {
    const result = await addTransactCustomers(custFormStateTestData());
    expect(result).toHaveProperty('customers');
    console.log(result);
  });
});