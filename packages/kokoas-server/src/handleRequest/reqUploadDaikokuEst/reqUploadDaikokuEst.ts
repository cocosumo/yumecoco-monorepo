import { RequestHandler } from 'express';
import { validateFile } from './validateFile';
import xlsx from 'xlsx';

export interface ReqUploadDaikokuEstData {
  projId?: string,
}

export const reqUploadDaikokuEst : RequestHandler<
ReqUploadDaikokuEstData,
{
  message: string
},
ArrayBuffer
> = async (req, res) => {

  try {
    const projId = req?.params?.projId;

    if (!projId) {
      throw new Error(`工事番号は取得出来ませんでした。${projId}`);
    }

    console.log('Uploading to projId: ', projId);

    const workbook = xlsx.read(req.body);
    await validateFile(workbook);
    // Processing
    console.log('DONE processing file');

    res.status(200).json({
      message: 'success',
    });

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }

};