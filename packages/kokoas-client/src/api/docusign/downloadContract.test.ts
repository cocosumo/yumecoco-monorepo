import { downloadContract } from './downloadContract';

describe('Contract', () => {
  it('should download contract', async () => {
    const result = downloadContract({
      contractId: '12128397-14e7-47d5-90b6-f8b655b39988',
    });
    

    expect(result).toHaveProperty('documents');
  });
});