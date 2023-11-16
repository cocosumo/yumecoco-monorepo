import { format, parseISO } from 'date-fns';
import { PaymentReminder } from '../../types/paymentReminder';


export const generateMessage = (reminderJson: PaymentReminder) => {

  const {
    andpadPaymentUrl,
    contractDate,
    projName,
    totalContractAmount,
    reminderUrl,
    cwRoomIds,
    expectedPaymentDate,
    expectedPaymentAmt,
    yumeAG,
  } = reminderJson;

  console.log('parseISO(contractDate)', parseISO(contractDate));

  const title = '[title]【ココアス】お客さまからの入金が確認できていません[/title]';

  const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');

  const message = `本メッセージは入金予定日を過ぎても入金が確認できていない請求に対して案内しています。
本連絡と前後して、お客様から入金がされている場合はご容赦ください。
[hr]
`;

  const content = `契約日  : ${format(parseISO(contractDate), 'yyyy年M月d日')}
工事名  : ${projName}
契約金額: ${(+totalContractAmount).toLocaleString()} 円
請求金額: ${(+expectedPaymentAmt).toLocaleString()} 円
担当者  : ${agentNames}
夢てつAG: ${yumeAG}`;

  const link = `[info][title]ANDPAD入金ページ[/title]
${andpadPaymentUrl === '' ? '取得に失敗しました' : andpadPaymentUrl}[/info]`;

  const reminder = `[info][title]下記リンク先より、再通知日${expectedPaymentDate ? '' : 'と入金予定日'}を設定してください[/title]
${reminderUrl === '' ? '取得に失敗しました' : reminderUrl}[/info]`;

  return `[info]${[title, message, content, link, reminder].join('\n')}[/info]`;
};
