import { yumecocoDocusign } from '../../../../../config/settings';

export const getSenderViewUrl = async (
  params :
  {
    envelopeId: string,
    returnUrl: string,
  },
) : Promise<{
  url: string,
}> => {

  if (!params.envelopeId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/senderViewUrl`;

  const data = params;

  console.log(data, endpoint);

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
