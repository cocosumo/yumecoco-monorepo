import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { IContracts, IProjects } from 'types';
import { KAlertPurpose, alertMessages } from '../alertConfig';
import { summarizeMessageInfo } from './summarizeMessageInfo';



export const createMessage = async ({
  recProj,
  recContracts,
  purpose,
  reminderRecId,
}: {
  recProj: IProjects
  recContracts: IContracts[]
  purpose: KAlertPurpose
  reminderRecId: string
}) => {


  const {
    contractDate,
    contractAmt,
    cocoAGs,
    yumeAGs,
    reminderUrl,
  } = summarizeMessageInfo({
    recProj,
    reminderRecId,
    recContracts,
  });


  const title = '[title]【ココアス】お客さまへの請求書の作成が確認できていません[/title]';

  const message0 = `下記工事に対して、${alertMessages[purpose]}`;
  const message1 = '請求書の発行をお願いします。\n';

  const content = [
    '【工事内容】',
    `契約日　  :  ${contractDate ? format(parseISO(contractDate), 'yyyy年M月d日') : '-'}`,
    `工事名　  :  ${recProj.projName.value}`,
    `契約金額  :  ${(contractAmt ?? 0).toLocaleString()} 円`,
    `担当者　  :  ${cocoAGs}`,
    `夢てつAG :  ${yumeAGs} `,
  ].join('\n');

  const reminder = [
    '[info][title]再通知日設定[/title]',
    'リマインダーの間隔の変更は、下記リンク先よりご対応いただけます',
    'アラートの停止は経理担当者へご依頼ください',
    `${reminderUrl ?? 'URLの取得に失敗しました'} [/info]`,
  ].join('\n');

  const message2 = '本連絡と前後して処理されている場合はご容赦ください。';


  return `[info]${[title, message0, message1, content, reminder, message2].join('\n')}[/info]`;
};
