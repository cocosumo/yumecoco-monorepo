import { RequestHandler } from 'express';
import { validateFile } from './validateFile';
import xlsx from 'xlsx';

export interface ReqUploadDaikokuEstData {
  projId: string,
}

export const reqUploadDaikokuEst : RequestHandler<
ReqUploadDaikokuEstData,
{
  message: string
},
ArrayBuffer
> = async (req, res) => {

  try {

    console.log('Uploading to projId: ', req?.params?.projId);

    const workbook = xlsx.read(req.body);
    await validateFile(workbook);

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