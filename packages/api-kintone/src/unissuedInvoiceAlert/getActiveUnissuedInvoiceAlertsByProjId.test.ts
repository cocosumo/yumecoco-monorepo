import { describe, it, expect } from '@jest/globals';
import { getActiveUnissuedInvoiceAlertsByProjId } from './getActiveUnissuedInvoiceAlertsByProjId';

describe('getActiveUnissuedInvoiceAlertsByProjId', () => {
  it('should return active unissued invoicealert by projId', async () => {
    const projId = 'dd77b5c6-3761-4a0d-950c-57990dfdf12f';
    const result = await getActiveUnissuedInvoiceAlertsByProjId(projId);

    console.log(result);

    expect(result.length).toBeGreaterThan(0);

  });
});
