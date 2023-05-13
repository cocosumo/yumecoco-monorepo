import { baseUrl } from 'config';
import { docusignEndpoints, kintoneProxyWrapper } from 'libs';
import { ApiNodes } from 'types';
import { z } from 'zod';

export const getCorrectViewUrl = async (envelopeId: string) => {
  if (!envelopeId) throw new Error('エンベロープIDは設定していません。');


  const apiNode: ApiNodes = 'docusign';

  const endpoint = `${baseUrl}/${apiNode}/${docusignEndpoints.correct}`;

  const { data } = await kintoneProxyWrapper({
    url: endpoint,
    method: 'POST',
    data: {
      envelopeId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const correctViewResult = z.object({
    url: z.string(),
  });

  return correctViewResult.parse(data);
};