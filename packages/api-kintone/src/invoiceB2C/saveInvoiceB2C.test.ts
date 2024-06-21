import { saveInvoiceB2C } from './saveInvoiceB2C';
import { expect, describe, it } from '@jest/globals';

describe('saveInvoiceB2C', () => {
  it('新規の顧客請求書を保存される', async () => {
    const result = await saveInvoiceB2C({
      record: {
        // https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/edit?projId=adebcd51-aaea-4150-8b21-7373710408e2
        projId: { value: 'adebcd51-aaea-4150-8b21-7373710408e2' },
      },
    }).catch(e => {
      return e;
    });

    console.log(result.errors);
    console.log(result);

    expect(result.errors).toBeUndefined();
  });
});