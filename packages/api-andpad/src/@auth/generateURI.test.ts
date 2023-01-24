import { generateURI } from './generateURI';

it('should generate URI', () => {

  const result = generateURI();
  console.log(result);

  expect(result).toBeDefined();
});