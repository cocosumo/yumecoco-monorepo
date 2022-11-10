
import { basePath } from '../../config';
import { getAccountId } from './authentication/';
import { createEnvelopeFromFile } from './createEnvelopeFromFile';
import path from 'path';
import fs from 'fs';

describe('Create Envelope', ()=>{
  it('should create envelope then send', async ()=>{
    const fileName = 'test.pdf';
    const filePath = path.resolve(__dirname, fileName);

    if (fs.existsSync(filePath))
      throw new Error(`Please provide test file. ${filePath}`);

    const accountId = await getAccountId();
    const result = await createEnvelopeFromFile({
      accountId,
      basePath: basePath,
      filePath: filePath,
    });
    console.log('RESULT', result);

    /* TODO: Improve assertion */
    expect(result).toBeDefined();
  }, 30000);
});
