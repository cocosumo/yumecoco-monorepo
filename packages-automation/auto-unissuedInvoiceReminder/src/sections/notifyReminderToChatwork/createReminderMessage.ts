import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { IUnissuedinvoicealert } from 'types';



export const createReminderMessage = ({
  recReminder,
}: {
  recReminder: IUnissuedinvoicealert
}) => {

  const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';
  const message0 = `${recReminder.alertType.value}`;
  const message1 = `請求書の発行をお願いします。
`;

  const content = `契約日  : ${format(parseISO(recReminder.contractDate.value), 'yyyy年M月d日')}
工事名  : ${recReminder.projName.value}
契約金額: ${(recReminder.totalContractAmount).toLocaleString()} 円
担当者  : ${recReminder.cocoAGs.value}
夢てつAG: ${recReminder.yumeAG.value}`;

  const reminder = `[info][title]下記リンク先より、再通知日を設定していただけます[/title]
https://rdmuhwtt6gx7.cybozu.com/k/303/show#record=${recReminder.$id.value}&mode=edit[/info]
`;
  const message2 = '本連絡と前後して処理されている場合はご容赦ください。';

  return `[info]${[title, message0, message1, content, reminder, message2].join('\n')}[/info]`;

};
