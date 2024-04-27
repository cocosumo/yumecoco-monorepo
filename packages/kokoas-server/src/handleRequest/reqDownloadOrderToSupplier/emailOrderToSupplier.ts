import { SendParams, sendEmail } from 'api-sendgrid';
import { isProd } from 'config';
import { GetDownloadOrderSlipResult } from 'types/src/common/order';

const testEmail = 'cocosumo.rpa03@gmail.com';

export const emailOrderToSupplier = async (orderSlipResult: GetDownloadOrderSlipResult) => {
  const {
    data,
    fileB64,
    fileName,
  } = orderSlipResult;


  if (!data.supplierOfficerEmail) {
    console.error('supplierOfficerEmail is required');
    return;
  }


  const sendParams: SendParams = {
    to: {
      // ※※※ ある程度安定したら、本番環境へみ送信するようにする ※※※

      //email: isProd ? data.supplierOfficerEmail :  testEmail,
      //name: isProd ?   data.supplierOfficer1 || '担当者' : testEmail,
      email: testEmail,
      name: testEmail,
    },
    from: 'system@cocosumo.co.jp',
    subject: isProd 
      ? `㈱山豊工建より／ 【${data.projName}】 工事依頼書を送付します。`
      : `【テストです】㈱山豊工建より／ 【${data.projName}】 工事依頼書を送付します。`,
    text: [
      `${data.supplierName} 御中\n`,
      'いつも大変お世話になっております。',
      '株式会社山豊工建です。\n',
      '=========================',
      `【${data.projName}】`,
      `【${data.constAddress}】`,
      `営業担当者：${data.cocoAG}`,
      `工事担当者：${data.cocoConst}`,
      '発注の詳細は添付の書類をご確認ください。',
      '=========================',
      '請求書の送付は以下の住所へお願いいたします。',
      '【店舗情報（東：豊川中央店、西：豊田中央店）】',
      'ご不明点等ございましたら、担当者までご連絡をお願いいたします。',
    ].join('\n'),
    attachments: [
      {
        content: fileB64,
        filename: fileName,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],

  };


  if (data.emailCc) {
    sendParams.cc = {
      email: data.emailCc,
      name: data.emailCc,
    };
  }

  if (data.emailBcc) {
    sendParams.bcc = {
      name: data.emailBcc,
      email: data.emailBcc,
    };
  }

  const emailResult = await sendEmail(sendParams);

  return emailResult;

};