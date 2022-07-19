import { yumecocoDocusign } from '../../../../../config/settings';

export const voidContract = async (projId: string) => {

  if (!projId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/void`;

  const data = {
    projId: projId,
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
      console.log(body);
      console.log(status);
      if (status == 200 && body) {
        return JSON.parse(body) as { url: string };
      }
    });
};
