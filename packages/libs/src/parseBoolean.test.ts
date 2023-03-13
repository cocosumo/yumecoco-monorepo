import { parseBoolean } from './parseBoolean';

describe('parseBoolean', () => {
  it('should parse boolean values', () => {
    const obj = {
      foo: 'true',
      bar: 'false',
      yey: 'Some real string',
    };

    const result = parseBoolean(obj);

    expect(result).toEqual({
      foo: true,
      bar: false,
      yey: 'Some real string',
    });
  });
});