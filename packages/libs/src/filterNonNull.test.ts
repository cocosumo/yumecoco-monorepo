import { expect, describe, it } from '@jest/globals';
import { filterNonNull } from './filterNonNull';

describe('filterNonNull', () => {
  it('should remove null and unidentified values', () => {
    const obj = {
      foo: 'bar',
      bar: null,
      yay: false,
      yey: 'Some real string',
      yey2: undefined,
    };

    const result = filterNonNull(obj);

    expect(result).toEqual({
      foo: 'bar',
      yey: 'Some real string',
      yay: false,
    });
  });
});