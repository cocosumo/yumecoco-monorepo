import { getCocosumoDetails } from './getCocosumoDetails';

describe('getCocosumoDetails', () => {
  it('should get cocosumo details', async () => {
    const result = await getCocosumoDetails();

    console.log(result);

    expect(result.companyName.value).toContain('ここすもハウス');
  });
});