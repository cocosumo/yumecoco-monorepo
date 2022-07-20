import { yumecocoDocusign } from '../../../../../config/settings';

export const sendContract = async (
  projId: string,
) : Promise<ISendEnvelopeResponse> => {

  try {

    if (!projId) throw new Error('Invalid Project Id.');
    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/send/direct`;

    const data = {
      projId: projId,
      origin: window.location.href,
    };

    console.log(data, endpoint);

    const [body, status] = await kintone.proxy(
      endpoint,
      'POST',
      { 'Content-Type': 'application/json' },
      data,
    );

    if (status == 200 && body) {
      return JSON.parse(body);
    } else {
      throw new Error(`Unknown response ${status} ${body}`);
    }


  } catch (err) {
    throw new Error(`エラーが発生しました。${err.message}`);
  }


};
