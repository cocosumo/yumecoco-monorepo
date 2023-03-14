import { RequestHandler } from 'express';
import { ReqDownloadEstimateForCustomer, reqDownloadEstimateForCustomer } from 'types';
//import { convertEstimateByIdToAndpad } from './convertEstimateByIdToAndpad';

export const downloadEstimateForCustomer: RequestHandler<
ReqDownloadEstimateForCustomer
> = async (req, res) => {
  try {
    const { estimateId } = reqDownloadEstimateForCustomer.parse(req.params);
    console.log('Received: ', estimateId);
    //const file =  await convertEstimateByIdToAndpad(estimateId);

    /*     res.attachment('実行予算.xlsx')
      .status(200);
    await file.xlsx.write(res);
 */
    res.end();

  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
  
};