import { RequestHandler } from 'express';
import { ReqDownloadEstimateForCustomer, reqDownloadEstimateForCustomer } from 'types';
import { convertEstimateForCustomerById } from './conversions/convertEstimateForCustomerById';
//import { convertEstimateByIdToAndpad } from './convertEstimateByIdToAndpad';

export const downloadEstimateForCustomer: RequestHandler<
ReqDownloadEstimateForCustomer
> = async (req, res) => {
  try {
    const { estimateId } = reqDownloadEstimateForCustomer.parse(req.params);
    console.log('Received: ', estimateId);
    const { 
      workbook,
      projName,
    } =  await convertEstimateForCustomerById(estimateId);

    res.attachment(`見積-${projName}-${new Date().toISOString()}.xlsx`)
      .status(200);

    await workbook.xlsx.write(res);

    res.end();

  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
  
};