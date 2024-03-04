import { describe, it, expect } from '@jest/globals';
import { getUnissuedInvReminderRecByAlertDate } from './getUnissuedInvReminderRecByAlertDate';



describe('getUnissuedInvReminderRecByAlertDate', () => {
  it('should get reminder datas by alert date', async () => {

    //const alertDate = new Date();

    const result = await getUnissuedInvReminderRecByAlertDate();

    expect(result).toBeGreaterThan(0);
    
  }, 1000000);
});
