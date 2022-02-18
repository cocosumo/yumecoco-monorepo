import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { dtArrOfCusts, dtGroup } from './test/data';

import { updateCustomersInGroup } from './updateCustomersInGroup';


describe('Customer and Group', () => {
  test('are updated succesfully', async () => {
    return updateCustomersInGroup({
      customers: dtArrOfCusts,
      group: dtGroup,
    }).then(resp => console.log('response', resp));
  });
});