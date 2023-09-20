import { format, parseISO } from 'date-fns';
import { PaymentReminder } from '../../types/paymentReminder';


export const generateMessage = (reminderJson: PaymentReminder) => {

  const {
    andpadPaymentUrl,
    contractDate,
    projName,
    totalContractAmount,
    reminderUrl,
  } = reminderJson;

  console.log('parseISO(contractDate)', parseISO(contractDate));

  const title = '[title]お客さまからの入金が確認できていません[/title]';

  const content = `契約日：${format(parseISO(contractDate), 'yyyy年M月d日')}
工事名:${projName}
契約金額: ${totalContractAmount}`;

  const link = `[info][title]ANDPAD入金ページ[/title]${andpadPaymentUrl}[/info]`;

  const reminder = `[info][title]下記リンク先より、再通知日を設定してください[/title]
${reminderUrl ?? '工事中'}[/info]`;

  return `[info]${[title, content, link, reminder].join('\n')}[/info]`;
};
