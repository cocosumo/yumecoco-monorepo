import { Router as router } from 'express';
import { openAIEndpoints } from 'libs';
//import { reqGenerateReading } from '../handleRequest/openai/reqGenerateReading';
import bodyParser from 'body-parser';
import { reqAskForReading } from '../handleRequest/openai/reqAskForReading';


const route = router();
route.use(bodyParser.json({ limit: '1mb' }));

/* route.post(
  `/${openAIEndpoints.generateReading}`,
  reqGenerateReading,
); */

route.post(
  `/${openAIEndpoints.askForReading}`,
  reqAskForReading,
);

// "テスト"
route.get('/', (req, res) => {
  console.log('kokoas internal api');
  res.send('OPEN API - TEST CONNECTION');
});


export default route;