//import { headFullBrowser } from 'auto-common';
//import { login } from '../../auto-kintone';
import { extractUpdatedRecords } from './contracts/extractUpdatedRecords';
import { postContractToReminderApp } from './contracts/postContractToReminderApp';
import { convertContractsToReminder } from './contracts/convertContractsToReminder';
import { getAllProjects, getAllAndpadPayments, getUsers } from 'api-kintone';
import { getAllPaymentReminder } from './api-kintone';
import { filterContractByTargetProjType } from './contracts/filterContractByTargetProjType';


/**
 * 通知対象のレコード情報をまとめます
 */
export const createPaymentAlert = async () => {
  console.log('start create payment reminder');

  // 処理前準備
  // 関連するレコード情報を取得する
  const allProjects = await getAllProjects();
  const allReminders = await getAllPaymentReminder();
  const allAndpadPayments = await getAllAndpadPayments();
  const allUsers = await getUsers();

  // 契約アプリを参照し、対象の工事種別のレコードを取得する
  const tgtProjTypeContracts = await filterContractByTargetProjType();

  // 通知対象のレコードのみに絞り込む

  // 再通知アプリより、今日通知予定のレコードを取得する - (1)


  // (1) と(2)の情報をまとめる

};
