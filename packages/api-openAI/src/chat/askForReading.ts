
import { openai } from '../@common/config';


export const askForReading = async (str: string) => {

  const { data } = await openai.createChatCompletion({
    model: 'text-davinci-edit-001',
    max_tokens: 120,
    temperature: 1,
    top_p: 1,
    messages: [
      {
        role: 'system',
        content: [
          '- You are a Japanese reading names.',
          '- Replace the input with Japanese katakana.',
          '- Never explain.',
        ].join('\n'),
      },
      {
        role: 'user',
        content: str,
      },
    ],
       
  });

  return data;

};