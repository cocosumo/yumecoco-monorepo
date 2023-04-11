import { getInvoiceByEstDataId } from 'api-kintone/src/invoice/getInvoiceByEstDataId';
import { saveInvoice } from 'api-kintone/src/invoice/saveInvoice';
import { updateInvoices } from 'api-kintone/src/invoice/updateInvoices';
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

          /* recInvoices.forEach(async ({ uuid }) => {
            return saveInvoice({
              recordId: uuid.value,
              record: {
                invoiceStatus: { value: 'voided' },
              },
            });
          }); */
          updateInvoices(recInvoices);


          return recInvoices.length;
        },
      });
      on('task', {
        async setInvoiceStatusToSent(eissueInvoiceId: string) {
          return saveInvoice({
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