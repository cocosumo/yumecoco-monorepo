
import 'regenerator-runtime/runtime';
import { custFormStateTestData } from '../../../helpers/test/testData';
 

import { addCustomersByFormState } from './submitForm';

describe('Submit', ()=> {
  test('is successful', async ()=> {
    await addCustomersByFormState(custFormStateTestData)
      .then((resp) => {

        expect(resp).toMatchSnapshot({ ok: true });
      })
      .catch((error) => {

        expect(error).toMatchSnapshot({ ok: false });
      });
  });
});