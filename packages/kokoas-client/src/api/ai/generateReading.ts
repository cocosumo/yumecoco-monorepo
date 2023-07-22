
import { kintoneProxyWrapper, openAIEndpoints } from 'libs';
import { openAIBaseUrl } from './config';
import { CreateEditResponse } from 'openai';
 
export const generateReading = async (text: string) => {
  if (!text) return null;

  const endpoint = [
    openAIBaseUrl,
    openAIEndpoints.generateReading,
  ].join('/');
  

  const result = await kintoneProxyWrapper({
    url: endpoint,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { 
      text, 
    },
  });
  const { data } = result;

  return data as CreateEditResponse;


};