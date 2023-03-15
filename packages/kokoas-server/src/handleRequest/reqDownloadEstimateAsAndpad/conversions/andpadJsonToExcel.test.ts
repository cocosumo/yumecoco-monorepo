import path from 'path';
import { andpadJsonToExcel } from './andpadJsonToExcel';
import { EstimateToAndpadJsonSchema } from './estimateToAndpadJson';
import fs from 'fs';


describe('andpadJsonToExcel', () => {
  let testData: EstimateToAndpadJsonSchema;

  beforeAll(() => {
    testData = {
      estimateId: 'test',
      rows: [
        {
          フォルダ１: 'test',
          フォルダ２: 'test',
          フォルダ３: 'test',
          フォルダ４: 'test',
          明細名: 'test',
          工事場所: 'test',
          工事種類: 'test',
          備考: 'test',
          取引先ID: 'test',
          取引先名: 'test',
          定価: 0,
          見積金額単価: 0,
          見積原価単価: 0,
          '本体/追加': '本体',
          数量: 0,
          単位: 'test',
          実行予算単価: 0,
          メモ: 'test',
        },
      ],
    };
  });
  

  it('Andpadで必要な情報をJSON形式でExcelへ変換します', async () => {
    const result = andpadJsonToExcel(testData);

    const savePath = path.join(__dirname, '../../__TEST__', 'test.xlsx');

    // ファイルを保存
    await result.xlsx.writeFile( savePath);

    console.log('savePath: ', savePath);

    // ファイルが存在するか確認
    expect(fs.existsSync(savePath)).toBeTruthy();
  });
});