import {
  CarbonCopy,
  EnvelopeDefinition,
  Signer } from 'docusign-esign';
import { roles } from 'types';
import fs from 'fs/promises';
import { getFilePath } from 'kokoas-server/src/assets';
import { isProd } from 'config';
import { generateContractPdfV2 } from './generateContractPdfV2';
import { TContractData } from './getContractDataV2';
/**
 * 参考
 * https://www.docusign.com/blog/developers/tabs-deep-dive-placing-tabs-documents#:~:text=In%20the%20DocuSign%20web%20app,specifying%20x%20and%20y%20position.
 *  */

/*  Test emails */
const testTantouEmail = 'cocosumo.rpa03@gmail.com'; // 担当
const testCustEmail = 'cocosumo.rpa03@gmail.com'; // 顧客
const testTenchoEmail = 'cocosumo.rpa03@gmail.com'; // 店長
const testKeiriEmail = 'cocosumo.rpa03@gmail.com'; // 経理
const testHonKeiriEmail = 'cocosumo.rpa03@gmail.com'; //　本経理

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
    customers,
    cocoAG,
    projName,

    storeMngrName,
    storeMngrEmail,

    accountingName,
    accountingEmail,

    mainAccountingName,
    mainAccountingEmail,

    subAccountingName,
    subAccountingEmail,

    signMethod,
  } = data;

  const {
    email: officerEmail,
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const mainContractB64 = await generateContractPdfV2(data, 'base64' ) as string;
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
      roleName: roles.officer,
      recipientId: '1',
      routingOrder: '1',
      tabs: {
        approveTabs: [{
          anchorString: '/tt/',
          documentId: '1',
          pageNumber: '1',
          tabLabel: roles.officer,
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
          email: isProd ? custEmail : testCustEmail,
          name: custName,
          roleName: roles.customer,
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
              },
            ],
          },
        };
      },
    ));

  } else {
    /****************
    * 紙契約の場合
    *****************/

    /* 担当者 */
    signers.push({
      email: isProd ? officerEmail : testTantouEmail,
      name: officerName,
      roleName: roles.officer,
      recipientId: '1',
      routingOrder: '1',
      tabs: {
        signerAttachmentTabs: [{
          anchorString: '/tt/',
          tabLabel: roles.officer,
        }],
      },
    });
  }


  /* 共通 */

  /* 店長 */
  signers.push({
    email: isProd ? storeMngrEmail : testTenchoEmail,
    name: storeMngrName,
    roleName: roles.storeMngr,
    recipientId: '3',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/tc/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: roles.storeMngr,
      }],
    },
  });

  /* 経理 */
  signers.push({
    email: isProd ? accountingEmail : testKeiriEmail,
    name: accountingName,
    roleName: roles.accounting,
    recipientId: '33',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/ke/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: roles.accounting,
      }],
    },
  });

  /* 本社経理 */
  ccs.push({
    email: isProd ? mainAccountingEmail : testHonKeiriEmail,
    name: mainAccountingName,
    roleName: roles.main,
    recipientId: '4',
    routingOrder: '4',
  });

  // 経理(最終確認者）
  ccs.push({
    email: isProd ? subAccountingEmail : testHonKeiriEmail,
    name: subAccountingName,
    roleName: roles.accounting,
    recipientId: '44',
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
