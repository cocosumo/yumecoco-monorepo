import { describe, expect, it } from '@jest/globals';
import { addressHasPrefecture } from './addressHasPrefecture';

describe('addressHasPrefecture.test', () => {
  it('should return true if address has prefecture', () => {
    expect(addressHasPrefecture('愛知県豊田市華園町前田')).toBe(true);
  });

  it('should return false if address has no prefecture', () => {
    expect(addressHasPrefecture('豊田市華園町前田')).toBe(false);
  });

  it('should return false if address invalid prefecture', () => {
    expect(addressHasPrefecture('愛知k県豊田市華園町前田')).toBe(false);
  });

});