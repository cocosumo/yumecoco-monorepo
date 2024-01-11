import { InvoiceReminder } from '../../types/InvoiceReminder';



export const generateMessageForManager = (invoiceReminder: InvoiceReminder[]) => {

  console.log(invoiceReminder);

  const contractSummary = invoiceReminder.map(({
    projName,
    cwRoomIds,
    storeName,
    contractDate,
    totalContractAmount,
  }, idx) => {
    const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');

    return `${idx + 1}件目
${storeName}　${projName}
契約日:${contractDate}　契約金額 ￥${(+totalContractAmount).toLocaleString()}　担当者:${agentNames}
`;
  });


  const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';
  
  const message = `${invoiceReminder.length}件の請求書の発行が遅れています。
必要に応じて担当者へのフォローをお願いします。
※この連絡は契約日から一定期間たっても請求書が作成されていない契約に対して実施しています。`;

  const content = `[info][title]概要[/title]${contractSummary.join('[hr]\n')}[/info]`;


  return `[info]${[title, message, content].join('\n')}[/info]`;

};
