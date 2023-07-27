import { useQuery } from '@tanstack/react-query';
import { AppIds, baseUrl } from 'config';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import { ApiNodes } from 'types';

export const useContractReport = (
  contractId : string, 
  {
    enabled,
  }: {
    enabled: boolean,
  },
) => {


  return useQuery(
    [AppIds.contracts, contractId], 
    async () => {
      const apiNode: ApiNodes = 'kokoas';
      const endpoint = [baseUrl, apiNode, kokoasEndpoints.downloadContractReport].join('/');

      const {
        data,
      } = await kintoneProxyWrapper<{
        base64Img: string,
      }>({
        url: endpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          contractId,
        },
      });

      return data.base64Img;
    },
    {
      enabled: enabled && !!contractId,
    },
  );
};