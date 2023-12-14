import { describe, it, expect } from '@jest/globals';
import { getInHouseProjTypes } from './getInHouseProjTypes';

describe('Get Project Types', () => {
  it('should retrieve all project types', async () => {
    const result = await getInHouseProjTypes();

    expect(result)
      .toEqual(expect.arrayContaining([
        expect.objectContaining({
          $id: expect.objectContaining({ value: expect.any(String) }),
        }),
      ]));
  });
});