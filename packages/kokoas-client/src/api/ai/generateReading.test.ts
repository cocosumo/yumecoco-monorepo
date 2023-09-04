import { describe, expect, it } from '@jest/globals';
import { generateReading } from './generateReading';

describe('generateReading', () => {
  it('should be true', async () => {
    const result = await generateReading('山田太郎');
    
    console.log(result);
    expect(result).toBeTruthy();
  });
});