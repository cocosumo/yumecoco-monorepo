import { EnvelopesApi, ReturnUrlRequest } from 'docusign-esign';
import { apiClient } from '../../config';
import { getAccountId } from './authentication';


export const createSenderView = async (
  envelopeId: string,
  returnUrl = 'https://www.google.com',
) => {
  const accountId = await getAccountId();
  console.log('createSenderView AccountId: ', accountId);
  const envApi = new EnvelopesApi(apiClient);


  const viewRequest: ReturnUrlRequest = {
    returnUrl: returnUrl,
  };


  console.log(accountId, envelopeId);

  return envApi.createSenderView(
    accountId,
    envelopeId,
    {
      'returnUrlRequest': viewRequest,
    },
  );
};
