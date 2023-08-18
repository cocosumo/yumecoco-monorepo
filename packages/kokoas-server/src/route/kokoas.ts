import express, { Router as router } from 'express';
import { 
  reqUploadDaikokuEst, 
  reqUploadDaikokuGenka, 
  saveProjectToAndpad, 
  downloadEstimateForCustomer, 
  downloadEstimateAsAndpad,
  downloadEstimateAsAndpadEst, 
  
} from '../handleRequest';
import { kokoasEndpoints } from 'libs/src/endpoints';
import bodyParser from 'body-parser';
import { reqDownloadInvoice } from '../handleRequest/putInvoiceReport/reqDownloadInvoice';
import { reqGetProjectFromAndpadByProjId } from '../handleRequest/reqGetProjectFromAndpadByProjId';
import { reqGetProjectsFromAndpad } from '../handleRequest/reqGetProjectsFromAndpad';
import { reqGetProjectBySystemId } from '../handleRequest/reqGetProjectBySystemId';
import { reqImageToBase64 } from '../handleRequest/reqImageToBase64';
//import { reqCostMgtDataByProjId } from '../handleRequest/reqCostManagement';
import { reqCostMgtDataByProjIdV2 } from '../handleRequest/reqCostManagement/reqCostMgtDataByProjIdV2';
import { reqCostMgtExcelByData } from '../handleRequest/reqCostManagement/reqCostMgtExcelByData';
//import { reqAndpadApi } from '../handleRequest/reqAndpadApi/reqAndpadApi';
//import { reqContractReport } from '../handleRequest/reqContractReport/reqContractReport';


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
  `/${kokoasEndpoints.getProjectFromAndpadByProjId}/:projId`,
  reqGetProjectFromAndpadByProjId,
);

route.get(
  `/${kokoasEndpoints.getProjectsFromAndpad}`,
  reqGetProjectsFromAndpad,
);


route.get(
  `/${kokoasEndpoints.getProjectFromAndpadBySystemId}`,
  reqGetProjectBySystemId,
);


/* route.get(
  `/${kokoasEndpoints.getCostMgtDataByProjId}/:projId`,
  reqCostMgtDataByProjId,
); */

route.get(
  `/${kokoasEndpoints.getCostMgtDataByProjIdV2}/:projId`,
  reqCostMgtDataByProjIdV2,
);

route.post(
  `/${kokoasEndpoints.getCostMgtExcelByData}`,
  bodyParser.json({ limit: '50mb' }),
  reqCostMgtExcelByData,
);

route.get(
  `/${kokoasEndpoints.downloadEstimateAsAndpad}/:estimateId`,
  downloadEstimateAsAndpad,
);

route.get(
  `/${kokoasEndpoints.downloadEstimateAsAndpadEst}/:estimateId`,
  downloadEstimateAsAndpadEst,
);

route.get(
  `/${kokoasEndpoints.downloadEstimateForCustomer}/:estimateId`,
  downloadEstimateForCustomer,
);

route.post(
  `/${kokoasEndpoints.getImage}`,
  bodyParser.json({ limit: '1mb' }),
  reqImageToBase64,
);

/* route.post(
  `/${kokoasEndpoints.downloadContractReport}`,
  bodyParser.json({ limit: '1mb' }),
  reqContractReport,
); */

route.put(
  `/${kokoasEndpoints.downloadInvoice}`,
  bodyParser.json({ limit: '50mb' }),
  reqDownloadInvoice,
);

// endpoints using browser won't work on xserver
/* route.post(
  `/${kokoasEndpoints.accessAndpadApi}`,
  bodyParser.json({ limit: '5mb' }),
  reqAndpadApi,
); */


// "テスト"
route.get('/', (req, res) => {
  console.log('kokoas internal api');
  res.send('KOKOAS API - TEST CONNECTION');
});

export default route;