import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { IContracts, IProjects } from 'types';



export const generateMessage = ({
  recProj,
  recContracts,
  purpose,
}: {
  recProj: IProjects
  recContracts: IContracts[]
  purpose: string
}) => {



  const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';

  const agentNames = cwRoomIds.map(({ agentName }) => agentName).join(', ');


  const message = `お客様からの入金がありましたが、請求書が発行されていないようです。
請求書の発行をお願いします。
本連絡と前後して処理されている場合はご容赦ください。
`;

  const content = `契約日  : ${format(parseISO(contractDate), 'yyyy年M月d日')}
工事名  : ${projName}
契約金額: ${(+totalContractAmount ?? 0).toLocaleString()} 円
担当者  : ${agentNames}
夢てつAG: ${yumeAG}`;

  const reminder = `[info][title]下記リンク先より、再通知日${expectedCreateInvoiceDate ? '' : 'と請求書発行予定日'}を設定していただけます[/title]
${reminderUrl === '' ? 'URLの取得に失敗しました' : reminderUrl}[/info]`;


  return `[info]${[title, message, content, reminder].join('\n')}[/info]`;
};
