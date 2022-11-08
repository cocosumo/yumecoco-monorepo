import { getEnvelope } from './getEnvelope';

describe('Get envelope', () => {
  it('should get envelope by id', async () => {
    const result = await getEnvelope('c372b5ad-408e-4445-9330-506e825c4d32');

    console.log(result);

    expect(result).toHaveProperty('envelopeId');
  });
});