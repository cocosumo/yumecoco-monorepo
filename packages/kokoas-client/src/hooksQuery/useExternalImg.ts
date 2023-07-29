import { useQuery } from '@tanstack/react-query';
import { baseUrl } from 'config';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import { ApiNodes } from 'types';

export const useExternalImage = ({
  url,
  enabled = false,
}: {
  url: string,
  enabled?: boolean,
}) => {


  return useQuery(
    [url], 
    async () => {
      const apiNode: ApiNodes = 'kokoas';
      const endpoint = [baseUrl, apiNode, kokoasEndpoints.getImage].join('/');

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
          imageUrl: url,
        },
      });


      return data.base64Img;

    },
    {
      enabled,
    },
  );
};