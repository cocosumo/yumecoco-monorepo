import { baseUrl } from 'config/src/baseUrl';
import { kintoneProxyWrapper } from 'libs';
import { reqDownloadContractV2Response } from 'types';

export const downloadContract = async ({
  contractId,
}: {
  contractId: string,
}) => {
  if (!contractId) throw new Error('契約番号は設定していません。');


  const endpoint = `${baseUrl}/docusign/contract/download?contractId=${contractId}`;

  const { data } = await kintoneProxyWrapper({
    url: endpoint,
    method: 'GET',
    data: {},
    headers: {},
  });

  

  return reqDownloadContractV2Response.parse(data);
};