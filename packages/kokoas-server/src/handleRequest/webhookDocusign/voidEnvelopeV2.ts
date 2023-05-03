import { IContracts } from 'types';
import { saveContract } from 'api-kintone';
import { getContractByEnvId } from 'api-kintone/src/contracts/getContractByEnvId';


/**
 * Webhook event that is triggered when
 * enveloped is voided
 *
 * @param envelopeId
 * @returns {Object} request result
 */
export const voidEnvelopeV2 = async (envelopeId: string) => {
    
  const {
    uuid,
    voidedEnvelopes,
  } = await getContractByEnvId(envelopeId);
  console.log(`Voiding envelope id: ${envelopeId}`);

  // Other values are cleared at the frontend.
  // This might be faulty so I might have to rethink this flow.
  const record : Partial<IContracts> = {
    envelopeId: { value: '' },
    envDocFileKeys: {
      type: 'FILE',
      value: [] as kintone.fieldTypes.File['value'], 
    }, // Remove attached files
    envelopeStatus: { value: '' },
    envRecipients: { value: '' },
    voidedEnvelopes: {
      value: [
        ...(voidedEnvelopes.value.split(',')),
        envelopeId,
      ].filter(Boolean).join(',') },

  };

  const result = await saveContract({
    recordId: uuid.value,
    record,
  });

  console.log('voidEnvelopeV2 success');


  return result;
};
