import { saveContract } from './saveContract';
import { expect, describe, it } from '@jest/globals';

describe('saveContract', () => {
  it('新規契約を保存される', async () => {
    const result = await saveContract({
      record: {
        // https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/edit?projId=adebcd51-aaea-4150-8b21-7373710408e2
        projId: { value: 'adebcd51-aaea-4150-8b21-7373710408e2' },
        envCompleteDate: { value: new Date().toISOString() },
      },
    }).catch(e => {
      return e;
    });

    console.log(result.errors);
    console.log(result);

    expect(result.errors).toBeUndefined();
  });
});