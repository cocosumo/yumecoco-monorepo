import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { KAlertPurpose, alertMessages, alertPurposes } from 'kokoas-client/src/pages/projSearch/sections/result/details/paymentDetails/unissuedInvoiceAlert/alertConfig';
import { IUnissuedinvoicealert } from 'types';



export const createReminderMsgForCocoAg = ({
  recReminder,
}: {
  recReminder: IUnissuedinvoicealert
}) => {

  const {
    $id,
    alertType,
    contractDate,
    projName,
    totalContractAmount,
    cocoAGs,
    yumeAG,
  } = recReminder;

  const alertPurposesReverse = Object.fromEntries(Object.entries(alertPurposes).map(val => val.reverse()));
  const purpose = alertPurposesReverse[alertType.value] as KAlertPurpose;


  const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';
  const message0 = `下記工事に対して、${alertMessages[purpose]}`;
  const message1 = `請求書の発行をお願いします。
`;

  const contractDateStr = contractDate.value ? format(parseISO(contractDate.value), 'yyyy年M月d日') : '取得に失敗しました';

  const content = `契約日  : ${contractDateStr}
工事名  : ${projName.value}
契約金額: ${(+totalContractAmount.value).toLocaleString()} 円
担当者  : ${cocoAGs.value}
夢てつAG: ${yumeAG.value}`;

  const reminder = `[info][title]再通知日設定[/title]
リマインダーの間隔の変更や、アラートの停止は、下記リンク先よりご対応いただけます。
https://rdmuhwtt6gx7.cybozu.com/k/303/show#record=${$id.value}&mode=edit[/info]
`;
  const message2 = '本連絡と前後して処理されている場合はご容赦ください。';

  return `[info]${[title, message0, message1, content, reminder, message2].join('\n')}[/info]`;

};
