import { getAllUnits } from './getAllUnits';
import { describe, it, expect } from '@jest/globals';

describe('getAllUnits', () => {
  it('should return all units', async () => {
    const units = await getAllUnits();
    console.log(units);
    expect(units.length).toBeGreaterThan(0);
  });
});