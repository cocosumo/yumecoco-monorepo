import { kokoasAPIBaseUrl } from 'config';
import { kokoasEndpoints } from 'libs';
import { kintoneProxyWrapper } from 'libs/src/kitoneProxyWrapper';
import { GetDownloadOrderSlipBody, GetDownloadOrderSlipResult } from 'types/src/common/order';

/** 
 * 発注書をダウンロードする 
 * */
export const downloadOrderSlipById = async (orderId: string) => {
  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.downloadOrderSlip,
  ].join('/');
  
  if (!orderId) {
    throw new Error('orderId is required');
  }

  const result = await kintoneProxyWrapper<GetDownloadOrderSlipResult, unknown, GetDownloadOrderSlipBody>({
    url: `${endpoint}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      orderId,
    },
  });

  return result.data;

};