import { format, parseISO } from 'date-fns';
import { PaymentReminder } from '../../types/paymentReminder';


export const generateMessage = (reminderJson: PaymentReminder) => {

  const {
    andpadPaymentUrl,
    contractDate,
    projName,
    totalContractAmount,
  } = reminderJson;

  const title = '[title](*)お客さまからの入金が確認できていません(*)[/title]';

  const content = `契約日：${format(parseISO(contractDate), 'yyyy年M月d日')}
工事名[hr]${projName}[hr]
契約金額: ${totalContractAmount}`;

  const link = `[info][title]詳細[/title]${andpadPaymentUrl}[/info]`;

  return `[info]${[title, content, link].join('\n')}[/info]`;
};