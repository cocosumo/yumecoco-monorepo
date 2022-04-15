import { formToKintConst } from './formToKintone';
import { testData } from '../api/test/testData';



test('Cust', ()=>{
  expect(formToKintConst(testData)).toMatchSnapshot();
});