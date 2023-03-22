import { getAllInvoices } from 'api-kintone';
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
          const recInvoices = (await getAllInvoices())
            .filter(({ invoiceStatus, estimateLists }) => {
              if ((invoiceStatus.value === 'sent') 
              || (invoiceStatus.value === 'created')) {
                return estimateLists.value.some(({ value }) => {
                  return value.dataId.value === chkDataId;
                });
              }
            });

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
        async prepareInvoiceReissue(eissueInvoiceId: string) {
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