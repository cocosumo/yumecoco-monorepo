import { RequestHandler } from 'express';
import { ReqDownloadEstimateAsAndpad, reqDownloadEstimateAsAndpad } from 'types';

export const downloadEstimateAsAndpad: RequestHandler<
ReqDownloadEstimateAsAndpad
> = (req, res) => {
  try {
    const { estimateId } = reqDownloadEstimateAsAndpad.parse(req.params);

    res.send(estimateId);

  } catch (err) {
    res.status(400).send(err.message);
  }
  
};