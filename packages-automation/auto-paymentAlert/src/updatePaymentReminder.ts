//import { headFullBrowser } from 'auto-common';
//import { login } from '../../auto-kintone';
import { postContractToReminderApp } from './contracts/postContractToReminderApp';
import { convertContractsToReminder } from './contracts/convertContractsToReminder';
import { getAllProjects, getAllAndpadPayments, getUsers } from 'api-kintone';
import { getAllPaymentReminder } from './api-kintone';
import { convertReminders } from './contracts/convertReminders';
import { extractUpdatedAndpadPayments } from './contracts/extractUpdatedAndpadPayments';
import { extractUpdatedContracts } from './contracts/extractUpdatedContracts';



export const updatePaymentReminder = async () => {
  console.log('start update payment reminder');

  // ブラウザを開く
  /* const browser = await headFullBrowser();
  const page = await browser.newPage();

  // kintoneにログインする
  await login(page); */

  // 処理前準備
  // 工事情報のレコードを一括取得する
  const allProjects = await getAllProjects();
  const allReminders = await getAllPaymentReminder();
  const allAndpadPayments = await getAllAndpadPayments();
  const allUsers = await getUsers();

  // 1.契約アプリを参照し、24時間以内に更新かつ、対象の工事種別のレコードを取得
  const tgtProjTypeContracts = await extractUpdatedContracts();

  // 2. 1で取得したデータを、リマインダーアプリのデータ形式へ変換する
  const convertDatas = await convertContractsToReminder({
    projTypeContracts: tgtProjTypeContracts,
    projects: allProjects,
    reminders: allReminders,
    andpadPayments: allAndpadPayments,
    users: allUsers,
  });
 

  // 3.リマインダーアプリで通知必要になっているレコードに対して、
  // 24時間以内に更新された支払い情報があれば支払情報を追加します
  const tgtReminderDat = allReminders.filter(({ alertState }) => alertState.value !== '0');
  const tgtAndpadPayments = await extractUpdatedAndpadPayments();

  // 4. 3に対応するandpadのレコードをkintone形式にします
  const updateReminderDat = convertReminders({
    reminders: tgtReminderDat,
    andpadPayments: tgtAndpadPayments,
  });


  // 編集したデータをリマインダーアプリへ登録する  
  await postContractToReminderApp({ convertDatas: convertDatas });
};
