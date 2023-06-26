import { getFilePath } from './getFilePath';
import { expect, it } from '@jest/globals';

it('should return a valid file path', () => {
  const result = getFilePath({
    fileName: '請負契約書',
  });

  console.log(result);
  expect(result).toBeTruthy();
});