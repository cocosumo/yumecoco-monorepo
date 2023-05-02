import { ErrorDetails } from 'docusign-esign';
import { ISendEnvelopeResponse, ReqSendContractParams } from 'types';
import { baseUrl } from '../../config/settings';
import { docusignEndpoints } from 'libs';

/**
 * 
 * @param reqData 
 */
export const sendContractV2 = async (
  reqData: ReqSendContractParams,
) : Promise<ISendEnvelopeResponse> => {


  const {
    contractId,
  } = reqData;

  try {

    if (!contractId) throw new Error('契約番号は設定されていません。');
    /**
     * TODO: Endpoints need stronger typing. (Endpointはより安全な型定義が必要)
     *
     * The number of endpoints in our server are expected to increase or change,
     * so we will need to make an SDK for easier maintenance.
     *  */
    const endpoint = `${baseUrl}/${docusignEndpoints.sendDirect}`;

    const [body, status] = await kintone.proxy(
      endpoint,
      'POST',
      { 'Content-Type': 'application/json' },
      reqData,
    );

    if (status == 200 && body) {
      return JSON.parse(body);
    } else {
      const error: ErrorDetails =  JSON.parse(body);
      throw new Error(`${status} ${error.message}`);
    }


  } catch (err) {
    throw new Error(`${err.message}`);
  }


};
