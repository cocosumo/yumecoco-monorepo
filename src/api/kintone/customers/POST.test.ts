

import 'core-js/stable';
import 'regenerator-runtime/runtime';



import { addCustomers } from './POST';


describe('Multiple Customer Registration', ()=>{
  test('is registered', async ()=>{
    return addCustomers([{ fullName: { value: 'SUCCESS' }, agents : { value: [{ value:{ employeeId: { value: 25 } } }] } }])
      .then(result => {
        console.log(result);
        expect(result).toHaveProperty('ok', true);
      });
  });

});