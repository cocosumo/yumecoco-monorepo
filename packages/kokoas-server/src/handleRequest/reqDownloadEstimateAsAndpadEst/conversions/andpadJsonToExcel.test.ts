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
          フォルダ１: '必須',
          工事場所: '',
          工事種類: '',
          摘要: '',
          備考1: '',
          備考2: '',
          定価: 0,
          原単価: 0,
          数量: 0,
          単位: '',
          取引先ID: '',
          取引先管理ID: '',
          取引先名: '',
          メモ: '',
          金額反映なし: 'あり',
          PDF非表示: '表示',
          商品マスター管理ID: '',

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