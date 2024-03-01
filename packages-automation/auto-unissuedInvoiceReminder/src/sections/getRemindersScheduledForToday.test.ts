import { describe, it, expect } from '@jest/globals';
import { getRemindersScheduledForToday } from './getRemindersScheduledForToday';



describe('getRemindersScheduledForToday', () => {
  it('should get reminder datas by alert date', async () => {

    const result = await getRemindersScheduledForToday();

    expect(result.length).toBeGreaterThan(0);
    
  }, 1000000);
});
