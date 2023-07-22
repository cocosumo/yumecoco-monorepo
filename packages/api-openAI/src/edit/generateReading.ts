import { openai } from '../@common/config';

export const generateReading = async (str: string) => {

  /* const result = await axios({
    url: 'https://api.openai.com/v1/edits',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
    },
    method: 'POST',
    data: {
      model: 'text-davinci-edit-001',
      input: 'What day of the wek is it?',
      instruction: 'Fix the spelling mistakes',
    },
  }); */

  const result = await openai.createEdit({
    model: 'text-davinci-edit-001',
    instruction: 'Replace with japanese reading in katakana',
    input: str,
    temperature: 0,
  });

  console.log('generateReading', result.data, result.data.choices);

};