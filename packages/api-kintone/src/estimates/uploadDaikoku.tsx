import { baseUrl } from 'kokoas-client/src/config/settings';
import { ApiNodes, KokoasApiNodes } from 'types';
import { externalApi } from '../@proxy/externalApi';

export const uploadDaikoku = async () => {
  const apiRoot : ApiNodes = 'kokoas';
  const kokoasApiNode: KokoasApiNodes = 'uploadDaikokuEst';

  if (!baseUrl) {
    throw new Error('環境にBase_URLが設定していません。管理者にご連絡ください。');
  }
  const endpoint = [baseUrl, apiRoot, kokoasApiNode ].join('/');
  return externalApi(
    endpoint,
    'post', {},
    {},
  );
};