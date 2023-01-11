import { baseUrl } from 'kokoas-client/src/config/settings';
import { ReqUploadDaikokuEstData } from 'kokoas-server/src/handleRequest/reqUploadDaikokuEst';
import { ApiNodes, KokoasApiNodes } from 'types';
import { externalApiUpload } from '../@proxy/externalApiUpload';

export const uploadDaikokuEst = async (
  {
    projId,
    fileBlob,
  } :{
    projId: string,
    fileBlob: Blob,
  }) => {
  const apiRoot : ApiNodes = 'kokoas';
  const kokoasApiNode: KokoasApiNodes = 'uploadDaikokuEst';

  const dataContent: ReqUploadDaikokuEstData = {
    projId,
  };

  console.log(dataContent);

  const data = {
    format: 'RAW',
    value: fileBlob,
  };


  if (!baseUrl) {
    throw new Error('環境にBase_URLが設定していません。管理者にご連絡ください。');
  }
  const endpoint = [baseUrl, apiRoot, kokoasApiNode ].join('/');

  return externalApiUpload(
    endpoint,
    'POST',
    {
      // Define content type, required by
      'Content-Type': 'multipart/form-data; boundary="boundary"; charset=UTF-8',
    },
    data,
  );

};