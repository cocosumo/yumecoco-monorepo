import express, { Router as router } from 'express';
import { reqUploadDaikokuEst } from '../handleRequest/reqUploadDaikokuEst';
import { kokoasEndpoints } from 'libs/src/endpoints';
import { reqUploadDaikokuGenka } from '../handleRequest/reqUploadDaikokuGenka';
import { saveProjectToAndpad } from '../handleRequest';
import bodyParser from 'body-parser';
import { reqDownloadInvoice } from '../handleRequest/getInvoiceReport/reqDownloadInvoice';


const route = router();

route.post(
  `/${kokoasEndpoints.uploadEstimates}/:projId?`,
  express.raw({ type: '*/*', limit: '50mb' }),
  reqUploadDaikokuEst,
);

route.post(
  `/${kokoasEndpoints.uploadGenka}/:projId?`,
  express.raw({ type: '*/*', limit: '50mb' }),
  reqUploadDaikokuGenka,
);

route.post(
  `/${kokoasEndpoints.saveProjectToAndpad}/:projId?`,
  bodyParser.json({ limit: '50mb' }),
  saveProjectToAndpad,
);

route.get(
  `/${kokoasEndpoints.downloadInvoice}/:invoiceId`,
  bodyParser.json({ limit: '50mb' }),
  reqDownloadInvoice,
);


// "テスト"
route.get('/', (req, res) => {
  console.log('kokoas internal api');
  res.send('KOKOAS API - TEST CONNECTION');
});

export default route;