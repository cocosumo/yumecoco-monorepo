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
    paymentDate,
    paymentAmount,
  }, idx) => {

    const hasDepositDate = Boolean(paymentDate.value);
    const displayDate = hasDepositDate ? `入金日: ${paymentDate.value}` : '';
    const hasPaymentAmount = !isNaN(+paymentAmount.value) && paymentAmount.value !== '0' && paymentAmount.value !== '';
    const displayAmount = hasPaymentAmount ? `   入金額: \xA5${(+paymentAmount.value).toLocaleString()}-` : '';


    return [
      `${idx + 1}件目`,
      `${store.value}　${projName.value}`,
      `アラートの内容：${alertType.value}   ${displayDate}${displayAmount}`,
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
