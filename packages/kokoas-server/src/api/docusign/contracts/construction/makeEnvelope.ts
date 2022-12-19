import {
  CarbonCopy,
  EnvelopeDefinition,
  Signer } from 'docusign-esign';
import { ReqSendContract } from 'types';
import { getContractData } from '../../../kintone/getContractData';
import { generateContractPdf } from './generateContractPdf';
import fs from 'fs/promises';
import { getFilePath } from 'kokoas-server/src/assets';
import { isProd } from 'config';
/**
 * 参考
 * https://www.docusign.com/blog/developers/tabs-deep-dive-placing-tabs-documents#:~:text=In%20the%20DocuSign%20web%20app,specifying%20x%20and%20y%20position.
 *  */

/*  Test emails */
const testCustEmail = 'lenzras@gmail.com'; // 顧客
const testTantouEmail = 'yumecoco.rpa05@gmail.com'; // 担当
const testTenchoEmail = 'cocosumo.rpa03@gmail.com'; // 店長
const testKeiriEmail = 'cocosumo.rpa03@gmail.com'; // 経理
const testHonKeiriEmail = 'yumecoco.rpa05@gmail.com'; //　本経理

/**
 * 担当者承認　→　全顧客並列でサイン　→　「店長」と「経理」並列承認　→　完了
 *
 * https://trello.com/c/wlGiNsyx
 */

export const makeEnvelope = async ({
  data,
  status = 'sent',
  signMethod,
} :{
  data: Awaited<ReturnType<typeof getContractData>>,
  status: 'created' | 'sent',
  signMethod: ReqSendContract['signMethod'],
},
) => {

  const {
    customers,
    cocoAG,
    projName,

    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,

    mainAccountingName,
    mainAccountingEmail,
  } = data;

  const {
    email: officerEmail,
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const mainContractB64 = await generateContractPdf(data, 'base64') as string;
  const aggreementB64  = await fs.readFile(
    getFilePath({
      fileName: '工事請負契約約款',
    }),
    { encoding: 'base64' },
  );

  const signers : Signer[] = [];
  const ccs : CarbonCopy[] = [];

  /****************
   * 電子署名の場合
   * **************/
  if (signMethod === 'electronic') {


    /* 担当者 */
    signers.push({
      email: isProd ? officerEmail : testTantouEmail,
      name: officerName,
      roleName: '担当者',
      recipientId: '1',
      routingOrder: '1',
      tabs: {
        approveTabs: [{
          anchorString: '/tt/',
          documentId: '1',
          pageNumber: '1',
          tabLabel: '担当者',
        }],
      },
    });

    /* 顧客 */
    signers.push(...customers
      .map<Signer>(
      (
        {
          custName,
          email: custEmail,
        },
        idx,
      ) => {
        return {
          email: isProd ? testCustEmail : custEmail,
          name: custName,
          roleName: '顧客',
          recipientId: `${1}${idx}`,
          routingOrder: '2',
          tabs: {
            dateSignedTabs: [
              {
                anchorString: `c${idx + 1}date`,
              },
            ],
            signHereTabs: [
              {
                anchorString: `c${idx + 1}`,
                anchorYOffset: '5',
                scaleValue: '66',
              },
            ],
          },
        };
      }));

  } else {
    /****************
    * 紙契約の場合
    *****************/

    /* 担当者 */
    signers.push({
      email: isProd ? officerEmail : testTantouEmail,
      name: officerName,
      roleName: '担当者',
      recipientId: '1',
      routingOrder: '1',
      tabs: {
        signerAttachmentTabs: [{
          anchorString: '/tt/',
          tabLabel: '担当者',
        }],
      },
    });
  }


  /* 共通 */

  /* 店長 */
  signers.push({
    email: isProd ? storeMngrEmail : testTenchoEmail,
    name: storeMngrName,
    roleName: '店長',
    recipientId: '3',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/tc/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: '店長',
      }],
    },
  });

  /* 経理 */
  signers.push({
    email: isProd ? accountingEmail : testKeiriEmail,
    name: accountingName,
    roleName: '経理',
    recipientId: '33',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/ke/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: '経理',
      }],
    },
  });

  /* 本社経理 */
  ccs.push({
    email: isProd ? mainAccountingEmail : testHonKeiriEmail,
    name: mainAccountingName,
    roleName: '本社',
    recipientId: '4',
    routingOrder: '4',
  });


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
    recipients: {
      signers: signers,
      carbonCopies: ccs,
    },
    status: status,
  };

  return env;
};
