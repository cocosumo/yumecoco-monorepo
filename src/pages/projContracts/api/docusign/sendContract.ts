import { ErrorDetails } from 'docusign-esign';
import { yumecocoDocusign } from '../../../../config/settings';

export const sendContract = async (
  reqData: ReqSendContract,
) : Promise<ISendEnvelopeResponse> => {


  const {
    projEstimateId,
  } = reqData;

  try {

    if (!projEstimateId) throw new Error('見積番号は設定されていません。');
    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/send/direct`;



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
