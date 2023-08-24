import { RequestHandler } from 'express';
import validator from 'validator';
import { SendParams, sendEmail } from 'api-sendgrid';
import { isEmpty } from 'lodash';


export const reqSendEmail: RequestHandler<
unknown,
unknown,
SendParams
> = async (req, res) => {
  const { body } = req;

  try {
    console.log('Sending email...', body);
    
    if (isEmpty(body)) {
      res.status(404).send({ error: 'body is empty' });
      return;
    }

    const result = await sendEmail(body);

    res.status(200).json(result);
    
  } catch (error) {
    const sanitizedError = validator.escape(error.message) ;
    res
      .status(400)
      .send(`Sendgrid : reqSendEmailが失敗しました。${sanitizedError}`);
  }
};
