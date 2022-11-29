import { getPostalCodes } from './getPostalCodes';

describe('getPostalCodes', () => {
  it('should get postal codes', async () => {
    const result = await getPostalCodes({
      prefecture: '愛知県',
      city: '豊田市',
    });

    console.log(result.length);

    expect(result.length).toBeGreaterThan(400);
  });
});