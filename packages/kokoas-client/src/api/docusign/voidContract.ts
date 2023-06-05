import { baseUrl } from 'config';
import { docusignEndpoints, kintoneProxyWrapper } from 'libs';
import { ApiNodes, IVoidReq, IVoidRes } from 'types';

export const voidContract = async (params: IVoidReq) => {

  try {

    if (!params.envelopeId) throw new Error('エンベロープ番号は定義されていません。');
    if (!params.voidedReason) throw new Error('無効にする理由は定義されていません。');
    
    const apiNode : ApiNodes = 'docusign';
    const endpoint = [
      baseUrl,
      apiNode,
      docusignEndpoints.void,
    ].join('/');


    const { data: result } = await kintoneProxyWrapper({
      url: endpoint,
      method: 'POST',
      data: params,
      headers: { 'Content-Type': 'application/json' },
    });

    return result as IVoidRes ;
    

  } catch (err) {
    throw new Error(` ${err.message}`);
  }

};
