/**
 * @jest-environment node
 */

import { searchAndpad } from './searchAndpad';
import { describe, it, expect } from '@jest/globals';

describe('convertProjToAndpad', () => {
  it('should convert project to andpand　案件', async () => {
    const result = await searchAndpad({
      q: '案件名　LIKE　早川',
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});