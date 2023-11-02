import { ReqDownloadContractV2Response } from 'types';
import { TContractData } from '../getContractDataV2';
import { generateContractPdfV2 } from './generateContractPdfV2';
import { v4 as uuidv4 } from 'uuid';
import { getFilePath } from 'kokoas-server/src/assets';
import fs from 'fs/promises';
import { generatePlanContract } from './generatePlanContract';

export const generateFiles = async (contractData: TContractData) => {

  const {
    contractType,
  } = contractData;

  const documents: ReqDownloadContractV2Response['documents'] = [];

  const mainContractFile = await generateContractPdfV2(contractData, 'base64') as string;
  documents.push({
    data: mainContractFile,
    fileName: '請負契約書.pdf',
    key: uuidv4(),
  });



  if (contractType === '設計契約') {
    const planContract = await generatePlanContract(contractData, 'base64') as string;
    documents.push({
      data: planContract,
      fileName: '設計契約.pdf',
      key: uuidv4(),
    });
  } else {
    const fileName = '工事請負契約約款';
    const yakkanFile = await fs.readFile(
      getFilePath({
        fileName: fileName,
      }),
      { encoding: 'base64' },
    );
    documents.push({
      data: yakkanFile,
      fileName: `${fileName}.pdf`,
      key: uuidv4(),
    });
  }

  return documents;
};