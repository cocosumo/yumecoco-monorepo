import { describe, it, expect } from '@jest/globals';
import { getActiveUnissuedInvoiceAlertsByAlertDate } from './getActiveUnissuedInvoiceAlertsByAlertDate';

describe('getActiveUnissuedInvoiceAlertsByProjId', () => {
  it('should return active unissued invoicealert by projId', async () => {
    const result = await getActiveUnissuedInvoiceAlertsByAlertDate(new Date());

    console.log(result.length);

    expect(result.length).toBeGreaterThan(0);

  });
});
