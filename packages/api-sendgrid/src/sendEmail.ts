import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY;

export const sendEmail = async () => {
  if (!apiKey) throw new Error('SENDGRID_API_KEY is not defined');

  sgMail.setApiKey(apiKey);
  const msg = {
    to: 'cocosumo.rpa03@gmail.com', // Change to your recipient
    from: 'system@ecocosumo.co.jp', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };


  return sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};