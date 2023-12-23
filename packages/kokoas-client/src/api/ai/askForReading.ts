
import { kintoneProxyWrapper, openAIEndpoints } from 'libs';
import { openAIBaseUrl } from './config';
import OpenAI from 'openai';
 
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
        user: kintone.getLoginUser().name,
      },
    });
    const { data } = result;

    // eslint-disable-next-line no-console
    console.log('AI request', data);

    return data as OpenAI.Chat.ChatCompletion;


  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return undefined;
  }

};