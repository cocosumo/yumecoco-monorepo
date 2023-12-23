import { describe, it } from '@jest/globals';
import { askForReading } from './askForReading';

describe('askForReading', () => {
  it('should work', async () => {
    const result = await askForReading('小林佳代子　石川智子');
    console.log(result);
    console.log(result);
  }); 
} );