
import OpenAI from 'openai';

export const openai = new OpenAI();

const openAIApiKey = process.env.OPENAI_API_KEY;

if (!openAIApiKey) throw new Error('OPENAI_API_KEY is not defined');

openai.apiKey = openAIApiKey;

/* const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});



export const openai = new OpenAI(configuration); */