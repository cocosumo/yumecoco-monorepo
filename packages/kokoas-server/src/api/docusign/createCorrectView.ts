import { EnvelopesApi } from 'docusign-esign';
import { apiClient } from '../../config';
import { getAccountId } from './authentication';


export const createCorrectView = async (
  envelopeId: string,
) => {
  const accountId = await getAccountId();
  console.log('createCorrectView AccountId: ', accountId);
  const envApi = new EnvelopesApi(apiClient);

  console.log(accountId, envelopeId);

  return envApi.createCorrectView(
    accountId,
    envelopeId,
  );
};
