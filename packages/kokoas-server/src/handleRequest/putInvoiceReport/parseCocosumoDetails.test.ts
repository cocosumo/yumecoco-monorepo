import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { parseCocosumoDetails } from './parseCocosumoDetails';

describe('parsing cocosumoDetails record', () => {
  it('should validate file', async () => {
    const recCocosumoDetails = await getCocosumoDetails();
    const result = await parseCocosumoDetails(recCocosumoDetails);
    
    console.log(result);

    expect(result).toHaveProperty('companyName');
  });
});