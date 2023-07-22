import { describe, it } from '@jest/globals';
import { generateReading } from './generateReading';

describe('generateReading', () => {
  it('should return reading', async () => {

    const reading = await generateReading('高橋加奈子');
    console.log(reading);
  });
});