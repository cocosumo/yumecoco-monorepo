
import { openai } from '../@common/config';



export const askForReading = async (str: string, user?: string) => {

  const completion = await openai.chat.completions.create({
    messages: [
      { 
        'role': 'system', 
        'content': [
          'You are a Japanese who is an expert in converting user input into the most popular katakana reading.',  
          'The user will send names of people or places.', 
          'Maintain spaces.',
          'Never explain.',
        ].join(' ') },
      {
        role: 'user',
        content:  str,
      },
    ],
    model: 'gpt-4-1106-preview',
    max_tokens: 200,
    user,
  });

  console.log('completion', JSON.stringify(completion, null, 2));

  return completion;

};