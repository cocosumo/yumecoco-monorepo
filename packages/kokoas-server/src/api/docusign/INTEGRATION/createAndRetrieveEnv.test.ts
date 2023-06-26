import { basePath } from 'kokoas-server/src/config';
import path from 'path';
import { getAccountId } from '../authentication';
import { createEnvelopeFromFile } from '../createEnvelopeFromFile';
import fs from 'fs';
import { getEnvelope } from '../getEnvelope';
import { expect, describe, it } from '@jest/globals';

describe('Envelope', () => {
  it('should create and retrieve the envelope.', async () => {
    const fileName = 'test.pdf';
    const filePath = path.resolve(__dirname, fileName);

    if (!fs.existsSync(filePath))
      throw new Error(`Please provide test file. ${filePath}`);


    const accountId = await getAccountId();
    const newEnv = await createEnvelopeFromFile({
      accountId,
      basePath: basePath,
      filePath: filePath,
    });

    console.log(newEnv);
    expect(newEnv).toHaveProperty('envelopeId');

    const {
      envelopeId,
    } = newEnv;

    if (!envelopeId)
      throw new Error('Failed to retrived envelope id.');

    const retrievedEnv = await getEnvelope(envelopeId);
    console.log(retrievedEnv);

    expect(retrievedEnv).toHaveProperty('envelopeUri');

  }, 30000 );
});