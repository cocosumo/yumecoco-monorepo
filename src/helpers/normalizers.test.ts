import { convertCustFormState, testFunc } from './normalizers';
import { custFormStateTestData } from './test/testData';

describe('Converters', ()=> {
  test('is hello', ()=> {
    expect(testFunc()).toBe('hello');
  });
  
  test('returns a kintone record', ()=>{
    const fn = convertCustFormState(custFormStateTestData());
    expect(fn[0]).toMatchSnapshot({
      contacts: expect.any(Object),
    });
  });
});
