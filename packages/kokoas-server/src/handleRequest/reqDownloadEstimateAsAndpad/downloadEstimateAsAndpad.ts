import { RequestHandler } from 'express';
import { ReqDownloadEstimateAsAndpad, reqDownloadEstimateAsAndpad } from 'types';
import { convertEstimateByIdToAndpad } from './convertEstimateByIdToAndpad';

export const downloadEstimateAsAndpad: RequestHandler<
ReqDownloadEstimateAsAndpad
> = async (req, res) => {
  try {
    const { estimateId } = reqDownloadEstimateAsAndpad.parse(req.params);

    const file =  await convertEstimateByIdToAndpad(estimateId);

    res.attachment('実行予算.xlsx')
      .status(200);
    await file.xlsx.write(res);

    res.end();

  } catch (err) {
    res.status(400).send(err.message);
  }
  
};