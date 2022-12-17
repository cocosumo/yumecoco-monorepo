import { EnvelopesApi } from 'docusign-esign';
import { apiClient } from '../../config';
import { getAccountId } from './authentication';

export const getEnvelope = async (
  envelopeId: string,
) => {

  const accountId = await getAccountId();

  console.log(apiClient);
  const envApi = new EnvelopesApi(apiClient);

  return envApi.getEnvelope(accountId, envelopeId, null);
};
