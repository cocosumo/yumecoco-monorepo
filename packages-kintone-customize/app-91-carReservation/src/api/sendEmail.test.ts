import { describe, it } from '@jest/globals';
import { sendEmail } from './sendEmail';

describe('sendEmail', () => {

  it('should send email', async () => {
    const result = await sendEmail({
      $revision: { value: 99 },
    } as any);

    console.log(result);

  }, 8000);

});