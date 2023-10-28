import {
  EnvelopeDefinition,
} from 'docusign-esign';
import fs from 'fs/promises';
import { getFilePath } from 'kokoas-server/src/assets';
import { generateContractPdfV2 } from './generate/generateContractPdfV2';
import { TContractData } from './getContractDataV2';
import { getRecipients } from './getRecipients/getRecipients';
/**
 * 参考
 * https://www.docusign.com/blog/developers/tabs-deep-dive-placing-tabs-documents#:~:text=In%20the%20DocuSign%20web%20app,specifying%20x%20and%20y%20position.
 *  */

/*  Test emails */
// const testTantouEmail = 'cocosumo.rpa03@gmail.com'; // 担当
// const testCustEmail = 'cocosumo.rpa03@gmail.com'; // 顧客
// const testTenchoEmail = 'cocosumo.rpa03@gmail.com'; // 店長
// const testKeiriEmail = 'cocosumo.rpa03@gmail.com'; // 経理
// const testHonKeiriEmail = 'cocosumo.rpa03@gmail.com'; //　本経理

/**
 * 担当者承認　→　全顧客並列でサイン　→　「店長」と「経理」並列承認　→　完了
 *
 * https://trello.com/c/wlGiNsyx
 */

export const makeEnvelopeV2 = async ({
  data,
  status = 'sent',
} :{
  data: TContractData,
  status: 'created' | 'sent',
}) => {

  const {
    projName,
  } = data;


  const mainContractB64 = await generateContractPdfV2(data, 'base64' ) as string;
  const aggreementB64  = await fs.readFile(
    getFilePath({
      fileName: '工事請負契約約款',
    }),
    { encoding: 'base64' },
  );

  const env: EnvelopeDefinition = {
    emailSubject: `【${projName}】`,
    documents: [
      {
        documentBase64: aggreementB64,
        name: '工事請負契約約款',
        fileExtension: 'pdf',
        documentId: '2',
      },
      {
        documentBase64: mainContractB64,
        name: '請負契約書',
        fileExtension: 'pdf',
        documentId: '1',
      },
    ],
    recipients: getRecipients(data),
    status: status,
  };

  return env;
};
