import 'regenerator-runtime/runtime';

import { getCustomersByIds } from './GET';

describe('Customers', () => {
  test('retrieved by ID succesfully.', async () => {
    getCustomersByIds(['276', '277']).then((resp) =>{
      expect(resp).toHaveProperty('records');
    });
  });
});