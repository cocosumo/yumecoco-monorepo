
import { getKintoneUserByEmpId, getKintoneUsers, getUserCodeById, getUserCodesByIds } from './GET';
import { describe, expect } from '@jest/globals';

describe('Kintone User', ()=>{
  test('are all retrieved', async ()=>{
    expect(await getKintoneUsers()).toHaveProperty('data');
  });

  test('retrieved by empId', async ()=>{
    expect(await getKintoneUserByEmpId('44'));
  });

  test('retrieved code', async ()=> {
    const result = await getUserCodeById('44');
    console.log(result);
    expect(result);
  } );

  test('retrieved codes', async ()=> {
    const result = await getUserCodesByIds(['44', '45']);
    console.log(result);
    expect(result);
  } );
});