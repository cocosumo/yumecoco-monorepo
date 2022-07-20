import { yumecocoDocusign } from '../../../../../config/settings';

export const sendContract = async (
  projId: string,
  envelopeId: string,
) : Promise<ISendEnvelopeResponse> => {

  if (!projId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/send/direct`;

  const data = {
    projId: projId,
    envelopeId: envelopeId,
    origin: window.location.href,
  };

  console.log(data, endpoint);

  return kintone.proxy(
    endpoint,
    'POST',
    { 'Content-Type': 'application/json' },
    data,
  )
    .then(([body, status]: any[]) => {

      if (status == 200 && body) {
        return JSON.parse(body);
      } else {
        throw new Error(`Unknown response ${status} ${body}`);
      }
    });
};
