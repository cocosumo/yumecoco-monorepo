import path from 'path';


/** 入金一覧csvファイルのパス設定 */
export const csvDirPath = path.join(__dirname, '../auto-andpadPaymentBackup/');
export const csvStoragePath = path.join(csvDirPath, '__TEMP__');
export const fileName = '入金一覧.csv';
export const filePath = path.join(csvStoragePath, fileName);
