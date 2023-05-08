
import { IConnectEvent } from 'types';
import { updateEstimateEnvelope } from '../../api/kintone/updateEstimateEnvelope';

/**
 * Handle update kintone process
 *
 * @param payload
 * @returns {Object} containing revision number
 */
export const saveToKintone = async (payload: IConnectEvent) => {
  const {
    event,
    data: {
      envelopeId,
      envelopeSummary: {
        status,
        envelopeDocuments,
        recipients,
      },

    },
  } = payload;

  // Will update this to be more flexible in case of
  // multiple documents.
  const documents = envelopeDocuments.map(({ PDFBytes, name }) => {
    return {
      data: PDFBytes,
      name: name + '.pdf',
    };
  });

  console.log(`Saving envelope id: ${envelopeId}`);


  return updateEstimateEnvelope({
    envelopeId,
    envelopeStatus: status,
    documents,
    event,
    recipients,
  });
};
