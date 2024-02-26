import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;

export type SendParams = Parameters<typeof sgMail.send>[0];

export const sendEmail = async (params: SendParams) => {
  if (!apiKey) throw new Error('SENDGRID_API_KEY is not defined');

  sgMail.setApiKey(apiKey);

  return sgMail
    .send(params)
    .then((resp) => {
      console.log('Email sent');
      return resp;
    })
    .catch((error) => {
      console.error(JSON.stringify(error));
      throw new Error('Email failed to send');
    });
};