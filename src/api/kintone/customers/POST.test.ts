import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { addCustomers, updateCustomers } from './POST';

describe('Customers', () => {
  test('is all registered', async () => {
    return addCustomers([
      {
        fullName: { value: 'SUCCESS' },
        agents: { value: [{ value: { employeeId: { value: 25 } } }] },
      },
    ]).then((result) => {
      console.log(result);
      expect(result);
    });
  });

  test('is updated', async () => {
    return updateCustomers([{
      id: '241',
      record: {
        fullName: { value: 'heyedsdsdyyy' },
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


