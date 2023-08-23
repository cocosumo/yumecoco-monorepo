import { Router as router } from 'express';
import { sendGridEndpoints } from 'libs';
//import { reqGenerateReading } from '../handleRequest/openai/reqGenerateReading';
import bodyParser from 'body-parser';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware';
import { reqSendEmail } from '../handleRequest/sendgrid/reqSendEmail';


const route = router();
route.use(bodyParser.json({ limit: '5mb' }));
route.use(apiKeyMiddleware);

/* route.post(
  `/${openAIEndpoints.generateReading}`,
  reqGenerateReading,
); */

route.post(
  `/${sendGridEndpoints.sendEmail}`,
  reqSendEmail,
);

// "テスト"
route.get('/', (req, res) => {
  console.log('sendgrid internal api');
  res.send('SENDGRID- TEST CONNECTION');
});


export default route;