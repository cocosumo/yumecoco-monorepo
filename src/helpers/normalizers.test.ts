import { convertCustFormState, testFunc } from './normalizers';
import { custFormStateTestData } from './test/testData';

describe('Converters', ()=> {
  test('is hello', ()=> {
    expect(testFunc()).toBe('hello');
  });
  
  test('returns a kintone record', ()=>{
    expect(convertCustFormState(custFormStateTestData));
  });
});
