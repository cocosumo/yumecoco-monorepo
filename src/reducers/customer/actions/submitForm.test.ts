
import 'regenerator-runtime/runtime';
import { custFormStateTestData } from '../../../helpers/test/testData';


import { transactCustomers } from './submitForm';

describe('Submit', () => {
  test('is successful', async () => {
    const result = await transactCustomers(custFormStateTestData());
    expect(result).toHaveProperty('customers');
    console.log(result);
  });
});