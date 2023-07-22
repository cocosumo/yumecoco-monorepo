
import { openai } from '../@common/config';


export const askForReading = async (str: string, user?: string) => {

  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    max_tokens: 120,
    temperature: 1,
    top_p: 1,
    n: 1,
    frequency_penalty: 1,
    messages: [
      {
        role: 'system',
        content: [
          'You are a Japanese who is an expert in converting user input into the most popular katakana reading while maintaining spaces of the input.',
          'Never explain.',
        ].join(' '),
      },
      {
        role: 'user',
        content:  str,
      },
    ],
    user,
  });

  return data;

};