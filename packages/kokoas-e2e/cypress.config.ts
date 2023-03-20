import { getAllInvoices } from 'api-kintone/src/invoice/getAllInvoices';
import { saveInvoices } from 'api-kintone/src/invoice/saveInvoices';
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'iemq2k',
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'https://rdmuhwtt6gx7.cybozu.com/k/176/#',
    setupNodeEvents(on) {
      on('task', {
        async prepareInvoice(chkDataId: string) {
          const recInvoices = (await getAllInvoices())
            .filter(({ invoiceStatus, estimateLists }) => {
              if (invoiceStatus.value === 'sent') {
                return estimateLists.value.some(({ value }) => {
                  return value.dataId.value === chkDataId;
                });
              }
            });

          recInvoices.forEach(async ({ uuid }) => {
            return saveInvoices({
              recordId: uuid.value,
              record: {
                invoiceStatus: { value: 'voidedTest' },
              },
            });
          });

          return recInvoices.length;
        },
      });
    },

  },
});