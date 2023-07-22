
import { kintoneProxyWrapper, openAIEndpoints } from 'libs';
import { openAIBaseUrl } from './config';
import { CreateChatCompletionRequest } from 'openai';
 
export const askForReading = async (text: string) => {

  try {

    if (!text) return null;

    const endpoint = [
      openAIBaseUrl,
      openAIEndpoints.askForReading,
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

    return data as CreateChatCompletionRequest;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

};