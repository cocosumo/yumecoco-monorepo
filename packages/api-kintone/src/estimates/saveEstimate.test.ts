import { saveEstimate } from './saveEstimate';
import { describe, it, expect } from '@jest/globals';

describe('saveEstimate', () => {
  it('should save current time to envCompleteDate', async () => {
    const uuid = '5e4563ee-f154-47be-9254-4241f9415aea';
    const result = await saveEstimate({
      recordId: uuid,
      record: {
        envCompleteDate: { value: new Date().toISOString() },
      },
    }).catch(e => {
      return e;
    });

    console.log(result.errors);

    expect(result).toHaveProperty('id');
  });
});