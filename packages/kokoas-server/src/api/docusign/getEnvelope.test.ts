import { getEnvelope } from './getEnvelope';

describe('Get envelope', () => {
  it('should get envelope by id', async () => {
    const result = await getEnvelope('0250338c-6c0c-4761-a9b3-772701d0c93a');

    console.log(result);

    expect(result).toHaveProperty('envelopeId');
  });
});