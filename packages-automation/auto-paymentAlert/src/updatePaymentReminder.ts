//import { headFullBrowser } from 'auto-common';
//import { login } from '../../auto-kintone';
import { extractUpdatedRecords } from './contracts/extractUpdatedRecords';
import { postContractToRemainderApp } from './contracts/postContractToRemainderApp';
import { convertContractsToRemainder } from './contracts/convertContractsToRemainder';
import { getAllProjects } from 'api-kintone';
import { getAllPaymentConfRemainder } from 'api-kintone/src/paymentConfRemainder/getAllPaymentConfRemainder';
import { getAllAndpadPayments } from 'api-kintone/src/andpadPayments/getAllAndpadPayments';



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
  const allRemainders = await getAllPaymentConfRemainder();
  const allAndpadPayments = await getAllAndpadPayments();

  // 契約アプリを参照し、24時間以内に更新かつ、対象の工事種別のレコードを取得 - (0)
  const tgtProjTypeContracts = await extractUpdatedRecords();

  // (0)で取得したデータを、リマインダーアプリへ登録する
  const convertDatas = await convertContractsToRemainder({
    projTypeContracts: tgtProjTypeContracts,
    projects: allProjects,
    remainders: allRemainders,
    andpadPayments: allAndpadPayments,
  });

  await postContractToRemainderApp({ convertDatas: convertDatas });


  // リマインダーアプリの内、[alertState]が[0以外]のレコードを抽出 - (1)
  // (1)に対応するandpadのレコードに対して処理を行う -(2)
  // (2)-1 サブテーブルに情報を格納し、[alertState]を[1]にし、通知対象者を設定する
  // (2)-2 １度でも入金があれば、[alertState]を[0]にし、次のレコードに処理を移す
  // (2)-3 (1度も入金なしの物に対して)通知開始日を設定する ->　物件種別ごとに変わるため、要設定

};
