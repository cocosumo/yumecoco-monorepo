import { describe, expect, test } from '@jest/globals';
import { getExternalMemberById } from './getExternalMemberById';

describe('getExternalMemberById', () => { 

  test('should get ExternalMember by id', async () => { 
    const testId = '2e6e61b2-4347-ad07-8bd1-8126e097f7e5';
    const result = await getExternalMemberById(testId);

    console.log(result);

    expect(result).toHaveProperty('uuid');
  });
});
