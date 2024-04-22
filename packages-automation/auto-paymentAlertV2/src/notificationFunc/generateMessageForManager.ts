import { PaymentReminder } from '../../types/paymentReminder';



export const generateMessageForManager = (paymentReminder: PaymentReminder[]) => {

  console.log(paymentReminder);

  const title = '[title]【ココアス】お客さまからの入金が確認できていません[/title]';

  const message = `${paymentReminder.length}件の入金確認が遅れています。
必要に応じて担当者へのフォローをお願いします。
※この連絡は入金予定日を過ぎてもお客さまからの入金がない請求に対して実施しています。`;

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

    console.log(`idx=${idx}:: arrayPos=${arrayPos}`);

    if (idx === 0) {// 最初のみ挿入するメッセージ
      acc[0] = `[info]${[title, message, `[info][title]概要[/title] ${result}`].join('\n')}`;
    } else if ((idx + 1) % 5 === 0) {
      // 各ブロックの最後(ブロックを閉じる)
      acc[arrayPos] = `${acc[arrayPos]} ${result}[/info][/info]`;
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
