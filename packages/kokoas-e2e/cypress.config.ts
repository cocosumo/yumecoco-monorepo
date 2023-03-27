import { getInvoiceByEstDataId } from 'api-kintone/src/invoice/getInvoiceByEstDataId';
import { saveInvoices } from 'api-kintone/src/invoice/saveInvoices';
import { defineConfig } from 'cypress';

const baseUrl = process.env.KT_REDIRECT_URI;

export default defineConfig({
  projectId: 'iemq2k',
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: `${baseUrl}#`,
    setupNodeEvents(on) {
      on('task', {
        async prepareInvoice(chkDataId: string) {
          const { records: recInvoices } = (await getInvoiceByEstDataId(chkDataId));

          console.log('getInvoiceByEstDataId', recInvoices);

          recInvoices.forEach(async ({ uuid }) => {
            return saveInvoices({
              recordId: uuid.value,
              record: {
                invoiceStatus: { value: 'voided' },
              },
            });
          });

          return recInvoices.length;
        },
      });
      on('task', {
        async setInvoiceStatusToSent(eissueInvoiceId: string) {
          return saveInvoices({
            recordId: eissueInvoiceId,
            record: {
              invoiceStatus: { value: 'sent' },
            },
          });
        },
      });
    },

  },
});