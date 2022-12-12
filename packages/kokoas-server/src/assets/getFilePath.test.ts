import { getFilePath } from './getFilePath';

it('should return a valid file path', () => {
  const result = getFilePath({
    fileName: '請負契約書',
  });

  console.log(result);
  expect(result).toBeTruthy();
});