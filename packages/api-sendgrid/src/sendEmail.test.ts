import { describe, it } from '@jest/globals';
import { sendEmail } from './sendEmail';

describe('sendEmail', () => {
  it('should send email', async () => {
    
    await sendEmail();
  });

});