import 'regenerator-runtime/runtime';

import { convertMemo } from './converters';
import testData from './test/testData';

describe('Memo', ()=>{
  test('is succesfully converted', async ()=>{
    const converted = await convertMemo(testData);
    console.log(converted.notifyTo);

    expect(converted).toHaveProperty('groupId');
  });
});