import { format, parseISO } from 'date-fns';
import { InvoiceReminder } from '../../types/InvoiceReminder';


export const generateMessage = (reminderJson: InvoiceReminder) => {

  const {
    andpadInvoiceUrl, 
    contractDate,
    projName,
    totalContractAmount,
    reminderUrl,
    cwRoomIds,
    yumeAG,
    expectedCreateInvoiceDate,
  } = reminderJson;

  console.log('parseISO(contractDate)', parseISO(contractDate));

  const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';

  const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');

  const message = `契約から一定期間お客さまからの入金がない契約に対して案内しています。
本連絡と前後してお客さまから入金がされている場合はご容赦ください。
`;

  const content = `契約日  : ${format(parseISO(contractDate), 'yyyy年M月d日')}
工事名  : ${projName}
契約金額: ${(+totalContractAmount ?? 0).toLocaleString()} 円
担当者  : ${agentNames}
夢てつAG: ${yumeAG}`;

  const link = `[info][title]ANDPAD入金ページ[/title]
${andpadInvoiceUrl === '' ? '取得に失敗しました' : andpadInvoiceUrl}[/info]`;

  const reminder = `[info][title]下記リンク先より、再通知日${expectedCreateInvoiceDate ? '' : 'と入金予定日'}を設定してください[/title]
${reminderUrl === '' ? '取得に失敗しました' : reminderUrl}[/info]`;


  return `[info]${[title, message, content, link, reminder].join('\n')}[/info]`;
};
