import {
  EnvelopeDefinition,
} from 'docusign-esign';
import { TContractData } from './getContractDataV2';
import { getRecipients } from './getRecipients/getRecipients';
import { generateFiles } from './generate/generateFiles';
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

  const documents = await generateFiles(data);

  const envDocuments: EnvelopeDefinition['documents'] = documents.map(({
    data: dataB64,
    fileName,
  }, index) => ({
    fileExtension: fileName.split('.').pop() as string,
    documentBase64: dataB64,
    name: fileName.split('.').shift() as string,
    documentId: `${index + 1}`,
  }));

  const env: EnvelopeDefinition = {
    emailSubject: `【${projName}】`,
    documents: envDocuments,
    recipients: getRecipients(data),
    status: status,
  };

  return env;
};
