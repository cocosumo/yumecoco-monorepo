import { baseUrl } from 'config/src/baseUrl';
import { docusignEndpoints, kintoneProxyWrapper } from 'libs';
import { ApiNodes, reqDownloadContractV2Response } from 'types';

export const downloadContract = async ({
  contractId,
}: {
  contractId: string,
}) => {
  if (!contractId) throw new Error('契約番号は設定していません。');

  const apiNode: ApiNodes = 'docusign';

  const endpoint = `${baseUrl}/${apiNode}/${docusignEndpoints.downloadContract}?contractId=${contractId}`;

  const { data } = await kintoneProxyWrapper({
    url: endpoint,
    method: 'GET',
    data: {},
    headers: {},
  });

  

  return reqDownloadContractV2Response.parse(data);
};