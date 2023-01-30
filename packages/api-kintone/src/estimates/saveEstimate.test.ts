import { saveEstimate } from './saveEstimate';

describe('saveEstimate', () => {
  it('should save Estimate', async () => {
    const uuid = '5e4563ee-f154-47be-9254-4241f9415aea';
    const result = await saveEstimate({
      recordId: uuid,
      record: {
        envCompleteDate: { value: '2023-02-16T14:05:00Z' },
      },
    }).catch(e => {
      return e;
    });

    console.log(result.errors);

    expect(result).toHaveProperty('id');
  });
});