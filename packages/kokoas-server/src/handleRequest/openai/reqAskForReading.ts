import { RequestHandler } from 'express';
import validator from 'validator';
import { askForReading } from 'api-openai';

export const reqAskForReading: RequestHandler<
unknown,
unknown,
{
  text: string,
  user: string,
}
> = async (req, res) => {
  const body = req.body;

  try {

    const {
      text = '',
      user = '',
    } = body;

    console.log(`USER:${user} OpenAI Asking for reading... ${text}`);

    if (!text) {
     
      res.status(200).send(null);
      return;
    }
 
    const result = await askForReading(text, user);

    console.log('Sending result...', result.choices[0].message?.content, result.usage);
    res.status(200).json(result);
    
  } catch (error) {
    const sanitizedError = validator.escape(error.message) ;
    res
      .status(400)
      .send(`OPENAI:reqAskForReadingが失敗しました。${sanitizedError}`);
  }
};
