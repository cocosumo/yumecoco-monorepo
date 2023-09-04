import { describe, it } from '@jest/globals';
import { sendEmail } from './sendEmail';

describe('sendEmail', () => {
  it('should send email', async () => {
    const msg = {
      to: {
        name: 'Test',
        email: 'cocosumo.rpa03@gmail.com',
      }, // Change to your recipient
      from: 'system@cocosumo.co.jp', // Change to your verified sender
      subject: 'TESTING SENDGRID',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    
    await sendEmail(msg);
  });

});