import { RequestHandler } from 'express';
import excel from 'exceljs';
import path from 'path';

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
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(req.body);

    await workbook.xlsx.writeFile(path.join(__dirname, 'test.xlsx'));

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