
import { RequestHandler } from 'express';
import { Xlsx } from 'exceljs';
import { getContractData } from '../api/kintone/getContractData';
import {
  generateContractXlsx, generateContractPdf,
} from '../api/docusign/contracts/';
import { ReqDownloadParams } from 'types';


export const reqDownloadContract: RequestHandler = async (req, res) => {
  try {
    const {
      projEstimateId,
      userCode = 'RPA03',
      fileType,
    } = req.query as unknown as ReqDownloadParams;

    let file;

    console.log('reqDownloadContract received', req.query);

    if (!projEstimateId) throw new Error('projEstimateId not defined');

    const contractData = await getContractData({
      projEstimateId,
      userCode: userCode,
    });

    const {
      projName,
      envelopeStatus,
    } = contractData;

    console.log('Contract data', projName, envelopeStatus);
    switch (fileType) {
      case 'xlsx':
        file = await generateContractXlsx(contractData, 'xlsx') as Xlsx;

        res.attachment(`請負契約書 - ${projName}.xlsx`)
          .status(200);
        await file.write(res);
        break;
      case 'pdf':
        console.log('Generating pdf');
        file = await generateContractPdf(contractData, 'base64');

        console.log('PDF File generated');
        res.status(200).json( {
          // Array here to accomodate multi-documents in the future
          documents: [file],
          envelopeStatus,
        });

        break;
    }
    res.end();
  } catch (err: any) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }
};
