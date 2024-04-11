import { describe, expect, it } from '@jest/globals';
import { findSuppliersByName, searchFields } from './findSuppliersByName';

describe('findSuppliersByName', () => {
  it('should find suppliers by name',  async () => {
    const testName = '山田';

    const suppliers = await findSuppliersByName(testName);

    console.log(suppliers);

    expect(suppliers.length).toBeGreaterThan(0);

    suppliers.forEach((supplier) => {
      const isMatch = searchFields.some((field) => {
        return (supplier[field].value as string).includes(testName);
      });

      expect(isMatch).toBe(true);
    });
  });
});
