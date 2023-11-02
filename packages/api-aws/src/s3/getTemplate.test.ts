import { beforeAll, describe, it } from '@jest/globals';
import { getTemplate } from './getTemplate';
import fs from 'fs';
import path from 'path';

describe('getTemplate', () => {
  beforeAll(() => {
    const testPath = path.join(__dirname, '__TEST__');
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }
  });
  it('should get template', async () => {
    const templateName = '設計契約書_20231028.01.pdf';
    const file = await getTemplate(templateName);
    if (!file) throw new Error('file is null'); // b64 string
    
    //save to file
    fs.writeFileSync(path.join(__dirname, '__TEST__', `templateName_${new Date().getTime()}.pdf`), file);

  });
});