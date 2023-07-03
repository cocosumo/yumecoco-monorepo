/**
 * @jest-environment node
 */


import { convertProjToAndpad } from './convertProjToAndpad';
import { describe, it, expect } from '@jest/globals';

describe('convertProjToAndpad', () => {
  it('should convert project to andpand　案件', async () => {
    const result = await convertProjToAndpad('8aa54bb3-10e7-45fa-adde-df7776082c77');

    console.log(result);

    expect(result).toBeDefined();
  });
});