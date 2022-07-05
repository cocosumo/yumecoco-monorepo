import { yumecocoDocusign } from '../../../../../config/settings';

export const sendContract = async (projId: string, envelopeId: string) => {

  if (!projId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/send/ukeoi`;

  const data = {
    projId: projId,
    envelopeId: envelopeId,
    origin: window.location.href,
  };

  return kintone.proxy(
    endpoint,
    'POST',
    { 'Content-Type': 'application/json' },
    data,
  )
    .then(([body, status]: any[]) => {
      console.log(body);
      console.log(status);
      if (status == 200 && body) {
        return JSON.parse(body) as { url: string };
      }
    });
};
