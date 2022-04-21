import { getFormDataById } from './getFormDataById';


test('Construction Data', async ()=>{
  expect(await getFormDataById('81')).toMatchSnapshot();
});