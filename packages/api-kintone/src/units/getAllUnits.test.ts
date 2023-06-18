import { getAllUnits } from './getAllUnits';

describe('getAllUnits', () => {
  it('should return all units', async () => {
    const units = await getAllUnits();
    console.log(units);
    expect(units.length).toBeGreaterThan(0);
  });
});