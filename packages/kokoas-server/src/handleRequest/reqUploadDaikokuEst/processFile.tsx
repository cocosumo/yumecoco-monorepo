import xlsx from 'xlsx';

/**
 * ファイルを処理します。
 *
 * 大黒さんは旧型xlsで、パッケージの制限でスタイルが無くなります。
 * 仕組みとして、そのまま大黒さんのファイルから情報を吸い上げ、
 * xlsx型のテンプレートに移行させます。
 *
 * ブラウザー上、重い処理なので、こちらサーバで処理を行います。
 *
 * よりいいパッケージがあれば、PRをお願いします。
 */
export const processFile = async (
  workbook: xlsx.WorkBook,
) => {

};