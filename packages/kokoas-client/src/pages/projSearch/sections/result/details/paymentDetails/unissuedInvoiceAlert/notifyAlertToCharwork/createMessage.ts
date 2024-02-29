import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { IContracts, IProjects } from 'types';
import { KAlertPurpose, alertMessages } from '../alertConfig';
import { getActiveUnissuedInvoiceAlertsByProjId } from 'api-kintone/src/unissuedInvoiceAlert/getActiveUnissuedInvoiceAlertsByProjId';
import { summarizeMessageInfo } from './summarizeMessageInfo';



export const createMessage = ({
  recProj,
  recContracts,
  purpose,
  projId,
}: {
  recProj: IProjects
  recContracts: IContracts[]
  purpose: KAlertPurpose
  projId: string
}) => {

  const messageInfo = async () => {
    const recReminders = await getActiveUnissuedInvoiceAlertsByProjId(projId);

    return summarizeMessageInfo({
      recProj,
      recReminders,
      recContracts,
      purpose,
    });
  };


  const messageContent = async () => {
    const {
      contractDate,
      contractAmt,
      cocoAGs,
      yumeAGs,
      reminderUrl,
    } = await messageInfo();

    const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';

    const message0 = `${alertMessages[purpose]}
`;
    const message1 = `請求書の発行をお願いします。
本連絡と前後して処理されている場合はご容赦ください。
`;

    const content = `契約日  : ${format(parseISO(contractDate), 'yyyy年M月d日')}
工事名  : ${recProj.projName.value}
契約金額: ${(contractAmt ?? 0).toLocaleString()} 円
担当者  : ${cocoAGs}
夢てつAG: ${yumeAGs}`;

    const reminder = `[info][title]下記リンク先より、再通知日を設定していただけます[/title]
${reminderUrl ?? 'URLの取得に失敗しました'}[/info]`;


    return `[info]${[title, message0, message1, content, reminder].join('\n')}[/info]`;
  };




  return messageContent;
};