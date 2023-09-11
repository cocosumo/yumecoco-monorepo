import { describe, it } from '@jest/globals';
import { andpadJSDOM } from './andpadJSDOM';

describe('andpadJSDOM', () => {
  it('should be return html', async () => {
    await andpadJSDOM();
  });
});