import { calculateEstimateRecord, calculateEstimateRow, getCustGroupById, getEstimateById, getProjById } from 'api-kintone';
import { getFilePath } from 'kokoas-server/src/assets';
import excel from 'exceljs';
import { addressBuilder, formatDataId } from 'libs';
import { Big } from 'big.js';


export const convertEstimateForCustomerById = async (estimateId: string) => {
  if (!estimateId) throw new Error('見積もりIDが提供されていません');
  const estimateRec = await getEstimateById(estimateId);

  if (!estimateRec) throw new Error(`見積もりは見つかりませんでした： ${estimateId}`);

  const {
    custGroupId,
    projId,
    dataId,
    内訳: { value: estimatesTable },
  } = estimateRec;

  const [custGroupRec, projRec] = await Promise.all([
    getCustGroupById(custGroupId.value),
    getProjById(projId.value),
  ]);

  if (!custGroupRec) throw new Error(`顧客グループは見つかりませんでした： ${custGroupId.value}`);
  if (!projRec) throw new Error(`プロジェクトは見つかりませんでした： ${projId.value}`);
  
  const {
    summary: {
      totalAmountAfterTax,
      totalAmountBeforeTax,
      totalTaxAmount,
      totalDiscountAmount,
      totalAmountBeforeDiscount,
    },
  } = calculateEstimateRecord({ record: estimateRec });

  const {
    members,
  } = custGroupRec;

  const {
    projName,
    postal,
    address1,
    address2,
  } = projRec;

  // 最初の顧客を取得
  const { customerName } = members.value[0].value;


  const templateFilePath = getFilePath({
    fileName: '見積書',
    fileType: 'xlsx',
  });

  // Read excel file.
  let workbook = new excel.Workbook();
  workbook = await workbook.xlsx.readFile(templateFilePath);

  
  /****************
   * 見積書見出
   ***************/
  (function shFrontPage() {
    const ws = workbook.getWorksheet('見積書見出');

    // 日付
    ws.getCell('AS2').value = new Date().toLocaleString();

    // 見積管理番号
    const estDataId = formatDataId(dataId.value);
    ws.getCell('AS3').value = `見積管理No.:${estDataId}`;

    // 顧客名
    ws.getCell('B5').value = `${customerName.value} 様`;

    // 見積金額
    ws.getCell('W13').value = totalAmountAfterTax;

    // 工事費
    ws.getCell('W16').value = totalAmountBeforeTax;

    // 消費税
    ws.getCell('AA17').value = totalTaxAmount;

    // 工事番号
    ws.getCell('H22').value = estDataId.slice(0, -3);

    // 工事名
    ws.getCell('H23').value = projName.value;

    // 工事場所
    ws.getCell('H24').value = addressBuilder({
      postal: postal.value,
      address1: address1.value,
      address2: address2.value,
    });
  })();
  

  /****************
   * 見積書内訳
   * **************/
  (function shSummary() {
    const ws = workbook.getWorksheet('見積内訳');
    
    // 非割引額
    ws.getCell('G3').value = totalAmountBeforeDiscount;
    ws.getCell('G5').value = totalAmountBeforeDiscount;


    // 割引額
    ws.getCell('G6').value = totalDiscountAmount;

    // 税額
    ws.getCell('G7').value = totalTaxAmount;

    // 合計
    ws.getCell('G8').value = totalAmountAfterTax;
  })();


  /************
   * 内訳明細
   ***********/
  (function shGroupedDetails() {

    const groupedDetails = estimatesTable.reduce<Record<string, number>>((acc, curr) => {
      const row = curr.value;
      const { 
        大項目, 
        税率,
        単価,
        原価,
        数量,
      } = row;

      const {
        rowUnitPriceAfterTax,
      } = calculateEstimateRow({
        isTaxable: Boolean(+税率.value),
        unitPrice: +単価.value,
        costPrice: +原価.value,
        quantity: +数量.value,
        taxRate: +税率.value,
      });

      if (!acc[大項目.value]) {
        acc[大項目.value] = 0;
      } 

      acc[大項目.value] = Big(acc[大項目.value]).add(rowUnitPriceAfterTax)
        .toNumber();

      return acc;
    }, {});

    const maxRows = 19;
    let currRowIdx = 1;
    let currSheetIdx = 1;
    const rowOffset = 2;
    let ws = workbook.getWorksheet(`内訳明細 (${currSheetIdx})`);

    for ( const [key, value] of Object.entries(groupedDetails)) {
      if (value < 0) continue; // 割引額は除外

      if (currRowIdx <= maxRows) {
        const rowIdx =  currRowIdx + rowOffset;
        ws.getCell(`A${rowIdx}`).value = `${currRowIdx}. ${key}`;
        ws.getCell(`D${rowIdx}`).value = '式';
        ws.getCell(`E${rowIdx}`).value = 1;
        ws.getCell(`G${rowIdx}`).value = value;

        currRowIdx++; // 次の行へ
      } else {
        // 次のシートへ
        currRowIdx = 1;
        currSheetIdx++;
        ws = workbook.getWorksheet(`内訳明細 (${currSheetIdx})`);
      }
    }

    ws.getCell(`A${currRowIdx + rowOffset}`).value = '《 合 計 》';
    ws.getCell(`G${currRowIdx + rowOffset}`).value = totalAmountBeforeDiscount;

    // 余ったシートを削除
    while (workbook.getWorksheet(`内訳明細 (${++currSheetIdx})`)) {
      workbook.removeWorksheet(`内訳明細 (${currSheetIdx})`);
    }
  })();


  /************
   * 見積書明細
   * **********/
  (function shDetails() {
    const ws = workbook.getWorksheet('見積明細');
  })();


  return workbook;
};