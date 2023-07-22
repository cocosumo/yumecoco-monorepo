
import { kintoneProxyWrapper, openAIEndpoints } from 'libs';
import { openAIBaseUrl } from './config';
import { CreateEditResponse } from 'openai';
 
export const generateReading = async (text: string) => {

  try {

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

    // eslint-disable-next-line no-console
    console.log('AI request', data);

    return data as CreateEditResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

};