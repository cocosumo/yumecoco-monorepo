import { IProjestimates } from 'types';
import { getEstimateByEnvId, saveEstimate } from 'api-kintone';


/**
 * Webhook event that is triggered when
 * enveloped is voided
 *
 * @param envelopeId
 * @returns {Object} request result
 */
export const voidEnvelope = async (envelopeId: string) => {
  const {
    uuid,
    voidedEnvelopes,
  } = await getEstimateByEnvId(envelopeId);
  console.log(`Voiding envelope id: ${envelopeId}`);

  // Other values are cleared at the frontend.
  // This might be faulty so I might have to rethink this flow.
  const record : Partial<IProjestimates> = {
    envId: { value: '' },
    envDocFileKeys: { value: [] } as any, // Remove attached files
    envStatus: { value: '' },
    envRecipients: { value: '' },
    voidedEnvelopes: {
      value: [
        ...(voidedEnvelopes.value.split(',')),
        envelopeId,
      ].filter(Boolean).join(',') },

  };

  const result = await saveEstimate({
    recordId: uuid.value,
    record,
  });


  return result;
};
