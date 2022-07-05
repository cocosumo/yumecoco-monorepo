import { yumecocoDocusign } from '../../../../../config/settings';

export type TPreviewResp = {
  imgB64: string,
  envelopeId: string,
  status: string
};

export const previewContract = async (projId: string) => {
  if (!projId) return;
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/send/ukeoi/preview`;
  console.log('Requesting to endpoint ' + endpoint);


  const data = {
    projId: projId,
    user: kintone.getLoginUser().code,
  };

  console.log('Requesting preview');

  return kintone.proxy(
    endpoint,
    'POST',
    {
      'Content-Type': 'application/json',

    },
    data,
  )
    .then(([body, status]: [string, number]) => {


      if (status == 200 && body) {
        return JSON.parse(body);
      }
    })
    .catch((err)=>{
      console.log(err.message);
      return {
        error: err.message,
      };
    });
};