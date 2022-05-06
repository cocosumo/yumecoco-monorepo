import { getFormDataById } from './getFormDataById';

describe('Cust', ()=> {
  test('get', async ()=>{
    expect(await getFormDataById('45')).toMatchSnapshot();
  });


});


