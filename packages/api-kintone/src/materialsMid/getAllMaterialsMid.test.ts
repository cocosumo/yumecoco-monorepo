import { getAllMaterialsMid } from './getAllMaterialsMid';
import { describe, it, expect } from '@jest/globals';

describe('getAllMaterialsMid', () => {
  it('中項目を全て取得', async () => {
    const result = await getAllMaterialsMid(); 
    
    console.log('中項目 length: ', result.length);
    expect(result.length).toBeGreaterThan(0);
  });
});