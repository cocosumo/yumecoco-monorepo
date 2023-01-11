import { Router as router } from 'express';
import bodyParser from 'body-parser';
import { reqUploadDaikokuEst } from '../handleRequest/reqUploadDaikokuEst';
import { KokoasApiNodes } from 'types';

const route = router();
route.use(bodyParser.json({ limit: '50mb' }));
// body parser error catcher
route.use((err: any, _: any, res: any, next: any) => {
  if (err) {
    res.status(400).send('error parsing data');
  } else {
    next();
  }
});

const uploadDaikokuNode : KokoasApiNodes = 'uploadDaikokuEst';

route.post(`/${uploadDaikokuNode}`, reqUploadDaikokuEst);

// "テスト"
route.get('/', (req, res)=>{
  console.log('kokoas internal api');
  res.send('KOKOAS API - TEST CONNECTION');
});

export default route;