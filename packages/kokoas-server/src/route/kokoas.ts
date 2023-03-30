import express, { Router as router } from 'express';
import { 
  reqUploadDaikokuEst, 
  reqUploadDaikokuGenka, 
  saveProjectToAndpad, 
  downloadEstimateForCustomer, 
  downloadEstimateAsAndpad, 
} from '../handleRequest';
import { kokoasEndpoints } from 'libs/src/endpoints';
import bodyParser from 'body-parser';
import { reqDownloadInvoice } from '../handleRequest/putInvoiceReport/reqDownloadInvoice';
import { reqGetProjectFromAndpadByProjId } from '../handleRequest/reqGetProjectFromAndpadByProjId';


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

route.get(`/${kokoasEndpoints.getProjectFromAndpadByProjId}/:projId`,
  reqGetProjectFromAndpadByProjId,
);

route.get(`/${kokoasEndpoints.downloadEstimateAsAndpad}/:estimateId`,
  downloadEstimateAsAndpad,
);

route.get(`/${kokoasEndpoints.downloadEstimateForCustomer}/:estimateId`,
  downloadEstimateForCustomer,
);

route.put(
  `/${kokoasEndpoints.downloadInvoice}`,
  bodyParser.json({ limit: '50mb' }),
  reqDownloadInvoice,
);


// "テスト"
route.get('/', (req, res) => {
  console.log('kokoas internal api');
  res.send('KOKOAS API - TEST CONNECTION');
});

export default route;