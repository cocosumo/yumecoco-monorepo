import { getTemplate } from 'api-aws/src/s3/getTemplate';
import { TContractData } from '../getContractDataV2';
import { PDFDocument } from 'pdf-lib';

/**
 * 設計契約を生成する
 * 依頼 : K230
 * 
 * テンプレートはAWSから取得する
 */
export const generatePlanContract = async ( 
  contractData : TContractData,
  contentType: 'base64' | 'img' | 'Uint8Array' = 'base64',
) => {
  const templateName = '設計契約書_20231028.01.pdf';
  const template = await getTemplate(templateName);
  if (!template) throw new Error(`${templateName}が取得できませんでした。`);

  const pdfDoc = await PDFDocument.load(template);

  

  switch (contentType) {
    case 'base64':

      return pdfDoc.saveAsBase64();
    case 'Uint8Array':
    default:
      return pdfDoc.save();
  }

};