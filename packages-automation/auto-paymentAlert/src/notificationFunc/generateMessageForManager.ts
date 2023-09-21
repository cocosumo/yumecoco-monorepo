import { PaymentReminder } from '../../types/paymentReminder';



export const generateMessageForManager = (paymentReminder: PaymentReminder[]) => {

  console.log(paymentReminder);

  const contractSummary = paymentReminder.map(({
    projName,
    cwRoomIds,
  }, idx) => {
    const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');

    return `${idx + 1}件目: 工事名 = ${projName},  担当者 = ${agentNames}`;
  });


  const title = '[title]【ココアス】お客さまからの入金が確認できていません[/title]';
  
  const message = `${paymentReminder.length}件の入金確認が遅れています。
必要に応じて担当者へのフォローをお願いします`;

  const content = `[info][title]概要[/title]${contractSummary.join('\n')}[/info]`;


  return `[info]${[title, message, content].join('\n')}[/info]`;

};
