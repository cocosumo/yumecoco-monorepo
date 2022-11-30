import { getPostalCodes } from './getPostalCodes';

describe('getPostalCodes', () => {
  it('should get postal codes', async () => {
    const result = await getPostalCodes({
      prefecture: '岐阜県',
      city: '可児市',
    });

    console.log(result.length);

    expect(result.length).toBeGreaterThan(0);
  });
});