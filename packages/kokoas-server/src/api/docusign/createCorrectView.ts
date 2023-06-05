import { CorrectViewRequest, EnvelopesApi } from 'docusign-esign';
import { apiClient } from '../../config';
import { getAccountId } from './authentication';

/**
 * @see https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopeviews/createcorrect/
 * @param envelopeId 
 * @param returnUrl 
 */
export const createCorrectView = async (
  envelopeId: string,
  returnUrl = 'https://cocosumo.net/',
) => {
  const accountId = await getAccountId();
  const envApi = new EnvelopesApi(apiClient);


  const viewRequest: CorrectViewRequest = {
    returnUrl,
  };

  console.log('createCorrectView AccountId: ', accountId, returnUrl);

  return envApi.createCorrectView(
    accountId,
    envelopeId,
    {
      'correctViewRequest': viewRequest,
    },
  );
};
