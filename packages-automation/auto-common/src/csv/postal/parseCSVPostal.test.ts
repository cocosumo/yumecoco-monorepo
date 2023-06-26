import { parseCSVPostal } from './parseCSVPostal';
import { describe, it } from '@jest/globals';

describe('parseCSVPostal', () => {
  it('should parse postal csv', async () => {
    const result = await parseCSVPostal();
    console.log(result.length, result[0]);
  }, 600000);
});