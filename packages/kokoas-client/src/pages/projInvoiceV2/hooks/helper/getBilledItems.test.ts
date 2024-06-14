import { describe, it, expect } from '@jest/globals';
import { produce } from 'immer';
import { getInvoiceB2CById } from 'api-kintone/src/invoiceB2C/getInvoiceB2CById';
import { getBilledItems } from './getBilledItems';


describe('getBilledItems', () => {

  it('複数契約書の内容から請求項目の作成ができること', async () => {

    const invoiceB2CDat = await getInvoiceB2CById('090d6b7a-3660-b1d8-0782-24dd1cb153b0');

    const invoiceB2CDat1 = produce(invoiceB2CDat, draft => {
      draft.invoiceDetails.value.slice(0, 1);
      draft.invoiceDetails.value[0].value.billingAmountAfterTax.value = '1000000';
      draft.invoiceDetails.value[0].value.invoiceItem.value = '契約-契約金';
      const newInvoice = {
        id: '',
        value: {
          billingAmountAfterTax: { value: '300000' },
          invoiceItem: { value: '契約-最終金' },
        },
      };
      draft.invoiceDetails.value.push(newInvoice);
    });

    const invoiceB2CDat2 = produce(invoiceB2CDat, draft => {
      draft.invoiceDetails.value.slice(0, 1);
      draft.invoiceDetails.value[0].value.billingAmountAfterTax.value = '-500000';
      draft.invoiceDetails.value[0].value.invoiceItem.value = '追加1-その他';
    });

    const invoices = [invoiceB2CDat1, invoiceB2CDat2];

    const result = getBilledItems({
      invoices,
    });

    console.log('結果', result);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].contractType).toBe('契約');
    expect(result[0].amount).toBe(1000000);
    expect(result[0].label).toBe('契約金');
    expect(result[2].contractType).toBe('追加1');
    expect(result[2].amount).toBe(-500000);
    expect(result[2].label).toBe('その他');
  }, 60000);

});
