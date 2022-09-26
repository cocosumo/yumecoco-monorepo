import { ErrorDetails } from 'docusign-esign';
import { yumecocoDocusign } from '../../../../config/settings';

export const sendContract = async (
  {
    projEstimateId,
    userCode,
  }: {
    projEstimateId: string
    userCode: string,
  },
) : Promise<ISendEnvelopeResponse> => {

  try {

    if (!projEstimateId) throw new Error('見積番号は設定されていません。');
    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/send/direct`;

    const data : ReqSendContract = {
      projEstimateId,
      userCode,
    };

    const [body, status] = await kintone.proxy(
      endpoint,
      'POST',
      { 'Content-Type': 'application/json' },
      data,
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
