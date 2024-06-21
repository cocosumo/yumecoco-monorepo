import { saveInvoiceB2C } from './saveInvoiceB2C';
import { expect, describe, it } from '@jest/globals';

describe('saveInvoiceB2C', () => {
  it('新規の顧客請求書を保存される', async () => {
    const result = await saveInvoiceB2C({
      record: {
        // https://rdmuhwtt6gx7.cybozu.com/k/176/#/project/edit/v2?projId=e777ec83-ea81-470e-ac31-d26e159362ae
        projId: { value: 'e777ec83-ea81-470e-ac31-d26e159362ae' },
      },
    }).catch(e => {
      return e;
    });

    console.log(result.errors);
    console.log(result);

    expect(result.errors).toBeUndefined();
  });
});