import { describe, it } from '@jest/globals';
import { askForReading } from './askForReading';

describe('askForReading', () => {
  it('should work', async () => {
    const result = await askForReading('高野順');
    console.log(result.choices);
    console.log(result);
  }); 
} );