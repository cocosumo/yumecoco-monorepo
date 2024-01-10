import { PaymentReminder } from '../../types/paymentReminder';



export const generateMessageForAccountant = (paymentReminder: PaymentReminder[]) => {

  const contractSummary = paymentReminder.map(({
    projName,
    cwRoomIds,
    storeName,
    expectedPaymentAmt,
    expectedPaymentDate,
    andpadPaymentUrl,
  }, idx) => {
    const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');

    return `${idx + 1}件目
${storeName}　${projName}
入金予定日: ${expectedPaymentDate}　入金予定額 ￥${(+expectedPaymentAmt).toLocaleString()}　担当者:${agentNames}
ANDPAD引合粗利管理[入金]　${andpadPaymentUrl}
[hr]`;
  });


  const title = '[title]【ココアス】お客さまからの入金が確認できていません[/title]';

  const message = `${paymentReminder.length}件の入金確認が遅れています。
必要に応じて担当者へのフォローをお願いします。
※この連絡は入金予定日を過ぎてもお客さまからの入金がない請求に対して実施しています。`;

  const content = `[info][title]概要[/title]${contractSummary.join('\n')}[/info]`;


  return `[info]${[title, message, content].join('\n')}[/info]`;

};
