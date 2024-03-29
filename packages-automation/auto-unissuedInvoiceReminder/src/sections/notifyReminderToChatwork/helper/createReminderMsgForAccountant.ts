import { alertPurposes } from 'kokoas-client/src/pages/projSearch/sections/result/details/paymentDetails/unissuedInvoiceAlert/alertConfig';
import { IUnissuedinvoicealert } from 'types';


export const createReminderMsgForAccountant = ({
  recReminder,
}: {
  recReminder: IUnissuedinvoicealert[]
}) => {

  const reminderSummary = recReminder.map(({
    $id,
    alertType,
    cocoAGs,
    projName,
    store,
    contractDate,
    totalContractAmount,
    plannedDepositDate,
  }, idx) => {

    const isSubsidy = alertType.value === alertPurposes.subsidy;
    const hasDepositDate = Boolean(plannedDepositDate.value);
    const displayDate = (isSubsidy && hasDepositDate) ? `入金予定日: ${plannedDepositDate.value}` : '';


    return [
      `${idx + 1}件目`,
      `${store.value}　${projName.value}`,
      `アラートの内容：${alertType.value} ${displayDate}`,
      `契約日：${contractDate.value} 　契約金額： ￥${(+totalContractAmount.value).toLocaleString()} 　担当者：${cocoAGs.value}`,
      `▶アラートの停止はこちらから：　https://rdmuhwtt6gx7.cybozu.com/k/303/show#record=${$id.value}&mode=edit`,
    ].join('\n');
  });

  const title = '[title]【ココアス】お客さまへの請求書の作成が遅れているようです[/title]';

  const message = [
    `${reminderSummary.length}件の請求書の発行が遅れています。`,
    '必要に応じて担当者へのフォローや、アラートの停止をお願いします。',
    '※この連絡はココアスからアラートを発行した案件を対象に実施しています。',
  ].join('\n');

  const content = [
    '[info][title]概要[/title]',
    `${reminderSummary.join('[hr]\n')}[/info]`,
  ].join('\n');


  return `[info]${[title, message, content].join('\n')}[/info]`;
};
