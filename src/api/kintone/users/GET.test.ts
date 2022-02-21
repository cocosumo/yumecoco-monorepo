import 'regenerator-runtime/runtime';

import { getKintoneUserByEmpId, getKintoneUsers } from './GET';

describe('Kintone User', ()=>{
  test('are all retrieved', async ()=>{
    expect(await getKintoneUsers()).toHaveProperty('data');
  });

  test('is retrieved by empId', async ()=>{
    expect(await getKintoneUserByEmpId('44'));
  });
});