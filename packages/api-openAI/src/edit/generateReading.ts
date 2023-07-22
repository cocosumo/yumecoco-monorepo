
import { openai } from '../@common/config';


export const generateReading = async (str: string) => {

  const { data } = await openai.createEdit({
    model: 'text-davinci-edit-001',
    instruction: 'Replace with japanese reading in katakana',
    input: str,
    temperature: 0,
  });

  return data;

};