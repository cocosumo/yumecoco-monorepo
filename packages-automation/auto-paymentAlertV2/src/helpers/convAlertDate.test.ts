import { describe, it, expect } from '@jest/globals';
import { convAlertDate } from './convAlertDate';


describe('convAlertDate', () => {
  it('通知予定日を返すこと', async () => {

    const result = convAlertDate({
      scheduledAlertDate: '2023-12-16',
      expectedPaymentDate: '2023-04-30',
    });

    expect(result).toBe('2023-12-16');

  }, 100000);


  it('支払予定日を返すこと', async () => {
    const result = convAlertDate({
      scheduledAlertDate: '2023-12-16',
      expectedPaymentDate: '2024-04-30',
    });

    expect(result).toBe('2024-04-30');

  }, 100000);
});
