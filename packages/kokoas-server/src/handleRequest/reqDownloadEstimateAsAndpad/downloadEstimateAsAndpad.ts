import { RequestHandler } from 'express';
import { ReqDownloadEstimateAsAndpad, reqDownloadEstimateAsAndpad } from 'types';
import { convertEstimateByIdToAndpad } from './convertEstimateByIdToAndpad';

export const downloadEstimateAsAndpad: RequestHandler<
ReqDownloadEstimateAsAndpad
> = async (req, res) => {
  try {
    const { estimateId } = reqDownloadEstimateAsAndpad.parse(req.params);

    const estimateExcel = await convertEstimateByIdToAndpad(estimateId);

    // base64でエンコードして返す
    res.send(Buffer.from(await estimateExcel.xlsx.writeBuffer()).toString('base64'));

  } catch (err) {
    res.status(400).send(err.message);
  }
  
};