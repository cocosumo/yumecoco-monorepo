import { getAllMaterialsItem } from './getAllMaterialsItem';
import { describe, it, expect } from '@jest/globals';

describe('getAllMaterialsMid', () => {
  it('部材を全て取得', async () => {
    const result = await getAllMaterialsItem(); 
    
    console.log('部材 length: ', result.length);
    expect(result.length).toBeGreaterThan(0);
  });
});