import { RequestHandler } from 'express';
import validator from 'validator';
import { askForReading } from 'api-openAI';

export const reqAskForReading: RequestHandler<
unknown,
unknown,
{
  text: string,
}
> = async (req, res) => {
  const body = req.body;

  try {
    console.log('OpenAI asking for reading...', body);

    const {
      text = '',
    } = body;


    if (!text) {
     
      res.status(200).send(null);
      return;
    }
 
    const result = await askForReading(text);

    console.log('Sending result...', result.choices[0].message?.content);
    res.status(200).json(result);
    
  } catch (error) {
    const sanitizedError = validator.escape(error.message) ;
    res
      .status(400)
      .send(`OPENAI:reqAskForReadingが失敗しました。${sanitizedError}`);
  }
};
