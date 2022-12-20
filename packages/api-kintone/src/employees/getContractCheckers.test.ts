import { getContractCheckers } from './getContractCheckers';

describe('getContractCheckers', () => {
  it('should get checkers by storeId', async () => {
    const result = await getContractCheckers('83128853-98af-47af-9e5a-9d711bee4a43');
    console.log(result);

    expect(result).toBeTruthy();
  });
});