import { generateURI } from './generateURI';
import { expect, it } from '@jest/globals';

it('should generate URI', () => {

  const result = generateURI();
  console.log(result);

  expect(result).toBeDefined();
});