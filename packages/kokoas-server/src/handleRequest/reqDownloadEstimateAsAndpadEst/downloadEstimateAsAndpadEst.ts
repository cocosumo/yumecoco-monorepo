import { RequestHandler } from 'express';
import { ReqDownloadEstimateAsAndpad, reqDownloadEstimateAsAndpad } from 'types';
import { convertEstimateToAndpadById } from './convertEstimateToAndpadById';

export const downloadEstimateAsAndpadEst: RequestHandler<
ReqDownloadEstimateAsAndpad
> = async (req, res) => {
  try {
    const { estimateId } = reqDownloadEstimateAsAndpad.parse(req.params);

    const {
      estExcel,
      estimateRec,
    } =  await convertEstimateToAndpadById(estimateId);

    const {
      工事名称: projName,
    } = estimateRec;

    res.attachment(`${projName.value}-見積.xlsx`)
      .status(200);
    await estExcel.xlsx.write(res);

    res.end();

  } catch (err) {
    res.status(400).send(err.message);
  }
  
};