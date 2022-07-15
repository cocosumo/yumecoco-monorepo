import { KintoneClient } from '../../../../../api/kintone';
import { yumecocoDocusign } from '../../../../../config/settings';
import { TypeOfForm } from '../../form';

type DownloadResponse = {
  documents?: string[], // Base64
  envelopeStatus?: TEnvelopeStatus,
  error?: string,
};

const dlFromCocoServer = async ({
  form,
  fileType,
} :
{
  form: TypeOfForm,
  fileType: 'pdf' | 'xlsx',
}) : Promise<DownloadResponse> => {
  try {


    const {
      projId,
    } = form;

    if (!projId) throw new Error('Invalid Project Id.');
    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/ukeoi/download?`;
    const data = {
      projId: projId,
      fileType: fileType,
    };

    const u = new URLSearchParams(data).toString();
    const [body, status] =  await kintone.proxy(
      endpoint + u, // concatinate parameters to endpoint
      'GET',
      {},
      data,
    );

    if (status == 200 && body) {
      return JSON.parse(body) ;
    } else {
      throw new Error(`Unhandled response status ${status}`);
    }

  } catch (err :any) {
    return {
      error: err.message,
    };
  }
};

const dlFilesFromKintone = async (
  form: TypeOfForm,
): Promise<DownloadResponse> => {
  const { envDocFileKeys, envelopeStatus } = form;

  try {

    const downloadPromises = envDocFileKeys.map(async (f) => {
      const arrayBuffer = await KintoneClient.file.downloadFile({
        fileKey: f,
      });
      const base64String =  window.btoa(new Uint8Array(arrayBuffer).reduce(
        function (data, byte) {
          return data + String.fromCharCode(byte);
        },
        '',
      ));
      return base64String;
    });

    return {
      documents: await Promise.all(downloadPromises),
      envelopeStatus,
    };
  }  catch (err) {
    console.log(err.message);
    return {
      error: 'Download files from kintone failed. Please Contact administrator.' + err.message,
    };
  }
};


export const downloadContract = async (
  params :  {
    form: TypeOfForm,
    fileType: 'pdf' | 'xlsx',
  },
) : Promise<DownloadResponse> => {

  const { fileType, form  } = params;
  const { envDocFileKeys } = form;

  console.log('download', params,  envDocFileKeys);
  if ( fileType === 'xlsx' || !envDocFileKeys.length) {
    return dlFromCocoServer(params);
  } else if (fileType === 'pdf' && envDocFileKeys.length) {
    return dlFilesFromKintone(form);
  } else {
    return { error: 'Unknown command. Contact administrator.' };
  }

};