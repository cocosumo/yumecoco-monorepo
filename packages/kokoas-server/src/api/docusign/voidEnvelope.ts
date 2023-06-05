import { Envelope, EnvelopesApi } from 'docusign-esign';
import { apiClient } from '../../config';
import { getAccountId } from './authentication';

// https://docusign.github.io/docusign-esign-node-client/module-api_EnvelopesApi.html#update

export const voidEnvelope = async (
  params: {
    envelopeId: string,
    voidedReason: string
  },
) => {
  const {
    envelopeId,
    voidedReason = '理由なし',
  } = params;
  const accountId = await getAccountId();

  console.log('Voiding by impersonating accountId: ', accountId);
  const envelopeApi = new EnvelopesApi(apiClient);
  const env: Envelope = {
    status: 'voided',
    voidedReason,
  };


  return envelopeApi.update(accountId, envelopeId, { envelope: env });
};
