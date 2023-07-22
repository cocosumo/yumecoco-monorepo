/* import { RequestHandler } from 'express';
import validator from 'validator';
import { generateReading } from 'api-openAI';

export const reqGenerateReading: RequestHandler<
unknown,
unknown,
{
  text: string,
}
> = async (req, res) => {
  const body = req.body;

  try {
    console.log('OpenAI Generating reading...', body);

    const {
      text = '',
    } = body;


    if (!text) {
     
      res.status(200).send(null);
      return;
    }
 
    const result = await generateReading(text);

    console.log('Sending result...', result.choices[0].text);
    res.status(200).json(result);
    
  } catch (error) {
    const sanitizedError = validator.escape(error.message) ;
    res
      .status(400)
      .send(`OPENAI:generateReadingが失敗しました。${sanitizedError}`);
  }
};
 */