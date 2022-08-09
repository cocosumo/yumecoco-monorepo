import { ErrorDetails } from 'docusign-esign';
import { yumecocoDocusign } from '../../../../config/settings';

export const sendContract = async (
  projId: string,
  custGroupId: string,
) : Promise<ISendEnvelopeResponse> => {

  try {

    if (!projId) throw new Error('Invalid Project Id.');
    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/send/direct`;

    const data = {
      projId: projId,
      custGroupId: custGroupId,
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
      const error: ErrorDetails =  JSON.parse(body);

      throw new Error(`${status} ${error.message}`);
    }


  } catch (err) {
    throw new Error(`${err.message}`);
  }


};
