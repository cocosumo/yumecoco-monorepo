
import 'regenerator-runtime/runtime';

import { custFormStateTestData } from './../actions/helpers/test/testData';


import  UpsertCustomers from './UpsertCustomers';

describe('Submit', () => {
  test('is successful', async () => {
    const result = await UpsertCustomers(custFormStateTestData());
    expect(result).toHaveProperty('customers');
    console.log(result);
  });
});