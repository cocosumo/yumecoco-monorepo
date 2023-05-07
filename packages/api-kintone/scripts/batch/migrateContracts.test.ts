import { migrateContracts } from './migrateContracts';

describe('migrateContracts', () => {
  it('should process migrateContracts', async () => {
    const result = await migrateContracts();

    console.log(result);

    expect(result).toBeDefined();
  }, 100000);
}); 