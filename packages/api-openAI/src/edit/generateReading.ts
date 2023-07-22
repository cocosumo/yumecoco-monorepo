
import { openai } from '../@common/config';

/** Will be deprecated soon
 * @d
 */
export const generateReading = async (str: string) => {

  const { data } = await openai.createEdit({
    model: 'text-davinci-edit-001',
    instruction: [
      'Replace with japanese reading in katakana.',
      'Result is maximum 120 characters.',
      'Never include any other characters than katakana.',
      'If result is too long, just convert the input on how is typed in japanese.',
    ].join('\n'),
    input: str,
    temperature: 0,
   
  });

  return data;

};