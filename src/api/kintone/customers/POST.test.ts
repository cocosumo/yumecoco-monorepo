
/**
 * @jest-environment jsdom
 */


import 'core-js/stable';
import 'regenerator-runtime/runtime';



import { addCustomers } from './POST';


describe('Multiple Customer Registration', ()=>{
  test('is registered', ()=>{
    return addCustomers([{ fullName: { value: 'SUCCESS' } }])
      .then(result => {
        console.log(result);
        expect(result).toHaveProperty('ok');
      });
  });

  test('has window', ()=>{
    console.log(window.location.hostname);
    expect(window).toBeTruthy();
  });
});