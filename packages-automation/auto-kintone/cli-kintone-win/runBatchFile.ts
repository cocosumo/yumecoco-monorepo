import { spawnSync } from 'child_process';
import { decode, encode } from 'iconv-lite';
import path from 'path';



// バッチファイルを実行する関数
export const runBatchFile = async (batchFileName: string) => {
  console.log('start batchFile process. batchFilePath =', batchFileName);
  const batchFilePath = path.join(__dirname, batchFileName);

  // spawnメソッドを使ってバッチファイルを実行
  const result = spawnSync(batchFilePath, []);

  // バッチファイルの実行が正常に終了した場合
  const stdout = decode(result.stdout, 'Shift_JIS');
  console.log('stdout', stdout);

  // バッチファイルの実行中にエラーが発生した場合
  const stderr = decode(result.stderr, 'Shift_JIS');
  console.log('error::', stderr);
  console.log('batchFile process completed.');

};
