import { yumecocoDocusign } from '../../../../../config/settings';

export const voidContract = async (params: IVoidReq) => {

  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/void`;

  const data = params;

  console.log(data, endpoint);

  const [body, status] = await kintone.proxy(
    endpoint,
    'POST',
    { 'Content-Type': 'application/json' },
    data,
  );

  if (status === 200) {
    return JSON.parse(body) as IVoidRes ;
  } else {
    throw new Error(`Unknown response. ${status} ${body}`);
  }

};
