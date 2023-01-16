import express, { Router as router } from 'express';
import { reqUploadDaikokuEst } from '../handleRequest/reqUploadDaikokuEst';
import { kokoasEndpoints } from 'libs/src/endpoints';


const route = router();

route.post(
  `/${kokoasEndpoints.uploadEstimates}/:projId?`,
  express.raw({ type: '*/*', limit: '50mb' }),
  reqUploadDaikokuEst,
);

route.post(
  `/${kokoasEndpoints.uploadGenka}/:projId?`,
  express.raw({ type: '*/*', limit: '50mb' }),
  reqUploadDaikokuEst,
);

// "テスト"
route.get('/',  (req, res)=>{
  console.log('kokoas internal api');
  res.send('KOKOAS API - TEST CONNECTION');
});

export default route;