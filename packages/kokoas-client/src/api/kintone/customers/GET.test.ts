import 'regenerator-runtime/runtime';

import { getCustomersByIds, searchCustomers } from './GET';

describe('Customers', () => {
  test('retrieved by ID succesfully.', async () => {
    getCustomersByIds(['276', '277']).then((res) =>{
      expect(res).toHaveProperty('records');
    });
  });

  it('has been searched', async ()=>{
    const res = await searchCustomers('ロレンズ');
    console.log(res.records[0].fullName.value);
    expect(res).toHaveProperty('records');
  });
});