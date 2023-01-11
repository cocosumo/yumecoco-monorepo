import { RequestHandler } from 'express';
import { validateFile } from './validateFile';

export interface ReqUploadDaikokuEstData {
  projId: string
}

export const reqUploadDaikokuEst : RequestHandler<
unknown,
{
  message: string
},
ArrayBuffer
> = async (req, res) => {

  try {

    console.log( req.body);

    await validateFile(req.body);

    console.log('DONE writing file');
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