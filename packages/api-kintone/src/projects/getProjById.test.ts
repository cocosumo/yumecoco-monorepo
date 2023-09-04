import { describe, expect, test } from '@jest/globals';
import { getProjById } from './getProjById';

describe('getProjById', () => { 

  test('should get project by id', async () => { 
    const testId = 'e6a8e273-8c62-4fff-82cd-9ca97c97813f';
    const result = await getProjById(testId);

    console.log(result);

    expect(result).toHaveProperty('uuid');
  });
});