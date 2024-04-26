import { kokoasAPIBaseUrl } from 'config';
import { kokoasEndpoints } from 'libs';

/** 
 * 発注書をダウンロードする 
 * */
export const downloadOrderSlipById = async (orderId: string) => {
  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.downloadOrderSlip,
  ].join('/');

  console.log('downloadOrderSlipById', endpoint, orderId);

};