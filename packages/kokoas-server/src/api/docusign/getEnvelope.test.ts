import { getEnvelope } from './getEnvelope';
import { expect, describe, it } from '@jest/globals';

describe('Get envelope', () => {
  it('should get envelope by id', async () => {
    const result = await getEnvelope('0ebdbf9b-d84c-4053-948b-968e7ca59869').catch((e) => console.log(e));

    console.log(result);

    expect(result).toHaveProperty('envelopeId');
  });
});