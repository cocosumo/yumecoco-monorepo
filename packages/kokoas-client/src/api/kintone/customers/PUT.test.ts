import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { updateCustomers } from './PUT';


describe('Customers', () => {
  test('are updated', async () => {
    return updateCustomers([{
      id: '241',
      record: {
        fullName: { value: '何も' },
        contacts: {
          value: [
            { id: '', value: {
              classification: { value: '母' },
              contactType: { value: '電話' },
              contactValue: { value: 'test' },
            } },
          ],
        },
      },

    }]);
  });
});