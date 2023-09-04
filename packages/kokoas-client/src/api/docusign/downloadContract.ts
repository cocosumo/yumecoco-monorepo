import { baseUrl } from 'config/src/baseUrl';
import { docusignEndpoints, kintoneProxyWrapper } from 'libs';
import { ApiNodes, ReqDownloadContractV2Response } from 'types';
import qs from 'qs';

export const downloadContract = async ({
  contractId,
}: {
  contractId: string,
}) => {
  if (!contractId) throw new Error('契約番号は設定していません。');

  const queryStr = qs.stringify({
    contractId,
    requestTime: new Date().getTime(), // to prevent caching
  });

  const apiNode: ApiNodes = 'docusign';

  const endpoint = `${baseUrl}/${apiNode}/${docusignEndpoints.downloadContract}?${queryStr}`;

  const { data } = await kintoneProxyWrapper({
    url: endpoint,
    method: 'GET',
    data: {},
    headers: {},
  });

  

  return data as ReqDownloadContractV2Response;
};