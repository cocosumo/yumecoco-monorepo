import { describe, it, expect } from '@jest/globals';
import { getActiveUnissuedInvoiceAlerts } from './getActiveUnissuedInvoiceAlerts';

describe('getActiveUnissuedInvoiceAlerts', () => {
  it('should return active unissued invoicealerts', async () => {
    const result = await getActiveUnissuedInvoiceAlerts();

    console.log(result);

    expect(result.length).toBeGreaterThan(0);

  });
});