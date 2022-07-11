import { yumecocoDocusign } from '../../../../../config/settings';


/* const getContentType = (fileType: string) => {
  switch (fileType) {
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'pdf' :
      return 'application/pdf+base64';
  }
};
 */
export const downloadContract = async (
  projId: string,
  fileType = 'xlsx',
) => {
  if (!projId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/ukeoi/download?`;
  const data = {
    projId: projId,
    fileType: fileType,
  };

  const u = new URLSearchParams(data).toString();

  return kintone.proxy(
    endpoint + u,
    'GET',
    {},
    data,
  )
    .then(([body, status]: any[]) => {

      if (status == 200 && body) {
        return JSON.parse(body);
      }
    });
};