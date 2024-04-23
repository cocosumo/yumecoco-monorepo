import { PaymentReminder } from '../../types/paymentReminder';



export const generateMessageForAccountant = (paymentReminder: PaymentReminder[]) => {

  const reminderLen = paymentReminder.length;

  const title = '[title]【ココアス】お客さまからの入金が確認できていません[/title]';

  const message = [
    `${reminderLen}件の入金確認が遅れています。`,
    '必要に応じて担当者へのフォローをお願いします。',
    '※この連絡は入金予定日を過ぎてもお客さまからの入金がない請求に対して実施しています。',
  ].join('\n');

  const contractSummary = paymentReminder.reduce((
    acc,
    {
      projName,
      cwRoomIds,
      storeName,
      expectedPaymentAmt,
      expectedPaymentDate,
      andpadPaymentUrl,
    },
    idx,
  ) => {
    const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');

    const result = [`${idx + 1}件目`,
      `${storeName}　${projName}`,
      `入金予定日: ${expectedPaymentDate}　入金予定額 ￥${(+expectedPaymentAmt).toLocaleString()}　担当者:${agentNames}`,
      `ANDPAD引合粗利管理[入金]　${andpadPaymentUrl}`,
      '[hr]\n',
    ].join('\n');

    const arrayPos = Math.floor(idx / 5);

    if (idx === 0) {// 最初のみ挿入するメッセージ
      const supplement = reminderLen > 5 ? '※5件ずつまとめて送信します' : '';
      acc[0] = `[info]${[title, message, `[info][title]概要 ${supplement}[/title] ${result}`].join('\n')}`;
    } else if ((idx + 1) % 5 === 0 || (idx === (reminderLen - 1))) {
      // 各ブロックの最後(ブロックを閉じる)
      const msgFinBlock = arrayPos > 0 ? '[/info]' : '[/info][/info]';
      acc[arrayPos] = `${acc[arrayPos]} ${result}${msgFinBlock}`;
    } else if ((idx + 1) % 5 === 1) {
      // 各ブロックの最初で、要素の追加とタイトルを入れる
      acc.push(`[info][title]概要[/title] ${result}`);
    } else {
      acc[arrayPos] = `${acc[arrayPos]} ${result}`;
    }

    return acc;

  }, [] as string[]);


  return contractSummary;
};
