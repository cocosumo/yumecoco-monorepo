import { describe, it, expect } from '@jest/globals';
import { shapeProjNum } from './shapeProjNum';

describe('createCostMngXlsx', () => {
  const testProjNum = 'KKA-C230001';

  it('should get new projNum', async () => {
    
    const newProjNum = await shapeProjNum(testProjNum);

    console.log('newProjNum::', newProjNum);
    // ファイルが存在することを確認
    expect(newProjNum).toBe('豊田店 C230001');
  });
});