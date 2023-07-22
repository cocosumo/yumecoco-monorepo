import { Router as router } from 'express';
import { openAIEndpoints } from 'libs';
import { reqGenerateReading } from '../handleRequest/openai/reqGenerateReading';
import bodyParser from 'body-parser';


const route = router();
route.use(bodyParser.json({ limit: '1mb' }));

route.post(
  `/${openAIEndpoints.generateReading}`,
  reqGenerateReading,
);

// "テスト"
route.get('/', (req, res) => {
  console.log('kokoas internal api');
  res.send('OPEN API - TEST CONNECTION');
});


export default route;