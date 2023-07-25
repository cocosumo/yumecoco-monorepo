import { spawnSync } from 'child_process';
import path from 'path';



// バッチファイルを実行する関数
export const runBatchFile = async (batchFileName: string) => {
  console.log('start batchFile process. batchFilePath =', batchFileName);
  const batchFilePath = path.join(__dirname, batchFileName);

  // spawnメソッドを使ってバッチファイルを実行
  const result = spawnSync(batchFilePath, [], { shell: true, encoding: 'ascii' });

  // バッチファイルの実行が正常に終了した場合
  console.log('stdout', result.stdout.toString());
  /* childProcess('close', (code) => {
    if (code === 0) {
      console.log('バッチファイルの実行が完了しました');
    } else {
      console.error(`バッチファイルの実行中にエラーが発生しました。エラーコード: ${code}`);
    }
  }); */

  // バッチファイルの実行中にエラーが発生した場合
  console.log('error::', result.stderr.toString());
  console.log('error::', result.error?.message.toString());
  /* childProcess.on('error', (err) => {
    console.error(`エラーが発生しました: ${err.message}`);
  }); */

  console.log('batchFile process completed.');
};
