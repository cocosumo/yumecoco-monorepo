import { yumecocoDocusign } from '../../../../../config/settings';

export const downloadContract = async (projId: string) => {
  if (!projId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/send/ukeoi/download`;
  const data = {
    projId: projId,
  };

  return kintone.proxy(
    endpoint,
    'GET',
    { 
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    },
    data,
  )
    .then(([body, status]: any[]) => {
      if (status == 200 && body) {
        return JSON.parse(body) as { envolopeId: string };
      }
    });
};