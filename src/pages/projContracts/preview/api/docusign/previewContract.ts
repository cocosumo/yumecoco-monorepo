import { yumecocoDocusign } from '../../../../../config/settings';

export const previewContract = async (projId: string) => {
  if (!projId) throw new Error('Invalid Project Id.');
  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/send/ukeoi/preview`;
  const data = {
    projId: projId,
    user: kintone.getLoginUser().code,
  };

  console.log('Psss', data);

  return kintone.proxy(
    endpoint,
    'POST',
    { 
      'Content-Type': 'application/json', 

    },
    data,
  )
    .then(([body, status]: any[]) => {

      if (status == 200 && body) {

        return body;
      }
    })
    .catch((err)=>{
      console.log(err.message);
    });
};