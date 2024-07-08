import { calculateEstimateRecord, getCustGroupById, getEstimateById, getProjById, getStoreById } from 'api-kintone';
import { getFilePath } from 'kokoas-server/src/assets';
import excel from 'exceljs';
import { addressBuilder, formatDataId } from 'libs';
import { groupEstItems } from './groupEstItems';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';



export const convertEstimateForCustomerById = async (estimateId: string) => {
  if (!estimateId) throw new Error('見積もりIDが提供されていません');
  const estimateRec = await getEstimateById(estimateId);

  console.log('estimateRec', estimateRec);

  if (!estimateRec) throw new Error(`見積もりは見つかりませんでした： ${estimateId}`);

  const {
    custGroupId,
    projId,
    dataId,
    内訳: { value: estimatesTable },
  } = estimateRec;

  const [
    custGroupRec, 
    projRec,
    cocosumoDetails,
  ] = await Promise.all([
    getCustGroupById(custGroupId.value),
    getProjById(projId.value),
    getCocosumoDetails(),
  ]);

  if (!custGroupRec) throw new Error(`顧客グループは見つかりませんでした： ${custGroupId.value}`);
  if (!projRec) throw new Error(`プロジェクトは見つかりませんでした： ${projId.value}`);
  if (!cocosumoDetails) throw new Error('会社情報は見つかりませんでした。');

  const {
    kensetsugyoKyoka,
  } = cocosumoDetails;

  const {
    members,
    storeId,
  } = custGroupRec;

  const storeDetails = await getStoreById(storeId.value);

  if (!projRec) throw new Error(`店舗情報は見つかりませんでした： ${storeId.value}`);
  
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
    店舗名: storeName,
    住所: storeAddress,
    FAX: storeFax,
    TEL: storeTel,
    postalCode,
  } = storeDetails;

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
    version: '20240708',
  });

  // Read excel file.
  let workbook = new excel.Workbook();
  let pageNumber = 1;

  workbook = await workbook.xlsx.readFile(templateFilePath);

  const estDataId = formatDataId(dataId.value);

  const initializeWorksheet = (sheetName: string) => {
    const ws = workbook.getWorksheet(sheetName);
    ws.getCell('H1').value = `Page.   ${pageNumber++}`;
    ws.getCell('A1').value = `工事番号:${estDataId}`;
    return ws;
  };

  /****************
   * 見積書見出
   ***************/
  (function shFrontPage() {
    const ws = workbook.getWorksheet('見積書見出');
    // ページ情報
    ws.getCell('AS4').value = `Page.   ${pageNumber++}`;

    // 日付
    ws.getCell('AS2').value = new Date().toLocaleString();

    // 見積管理番号
   
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

    // 会社名
    ws.getCell('AI22').value = `株式会社　山豊工建　ここすも　${storeName.value}`;
    ws.getCell('AI23').value = `${postalCode.value ? `〒${postalCode.value} ` : ''}${storeAddress.value}`;
    ws.getCell('AI24').value = `ハウスドゥ${storeName.value}内`;
    ws.getCell('AI25').value = `TEL: ${storeTel.value} FAX: ${storeFax.value}`;
    ws.getCell('AI26').value = kensetsugyoKyoka.value;
  })();
  

  /****************
   * 見積書内訳
   * **************/

  (function shSummary() {
    const ws = initializeWorksheet('見積内訳');
    const shokeihiBeforeTax = estimatesTable
      .reduce((acc, curr) => {
        if (curr.value.大項目.value.includes('諸経費')) {
          return acc + Number(curr.value.単価.value) * Number(curr.value.数量.value);
        }

        return acc;
      }, 0);

    // 非割引額
    ws.getCell('G3').value = totalAmountBeforeDiscount - shokeihiBeforeTax;
    ws.getCell('G5').value = shokeihiBeforeTax;
    ws.getCell('G6').value = totalAmountBeforeDiscount;


    // 割引額
    ws.getCell('G7').value = totalDiscountAmount;

    // 税額
    ws.getCell('G8').value = totalTaxAmount;

    // 合計
    ws.getCell('G9').value = totalAmountAfterTax;
  })();


  /************
   * 内訳明細
   ***********/

  // 見積をグループ化
  const groupedEstItems = groupEstItems(estimatesTable);
  const maxRows = 19;
  const rowOffset = 2; // ３行目から開始

  (function shGroupedDetails() {
    
    let currRowIdx = 1;
    let currSheetIdx = 1;
    
    let ws = initializeWorksheet(`内訳明細 (${currSheetIdx})`);
    let rowIdx =  currRowIdx + rowOffset;

    for ( const [key, value] of groupedEstItems) {
      const  { groupAmountBeforeTax } = value;
      if (groupAmountBeforeTax < 0) continue; // 割引額は除外

      if (currRowIdx > maxRows) {
      // 次のシートへ
        currRowIdx = 1;
        ws = initializeWorksheet(`内訳明細 (${++currSheetIdx})`);
      }

      rowIdx =  currRowIdx + rowOffset;
      ws.getCell(`A${rowIdx}`).value = `${currRowIdx}. ${key}`;
      ws.getCell(`D${rowIdx}`).value = '式';
      ws.getCell(`E${rowIdx}`).value = 1;
      ws.getCell(`G${rowIdx}`).value = groupAmountBeforeTax;

      currRowIdx++; // 次の行へ

    }

    ws.getCell('A22').value = ''; // 次へつづくを削除

    rowIdx++; // 最終行を上書きされないように
    ws.getCell(`A${rowIdx}`).value = '《 合 計 》';
    ws.getCell(`G${rowIdx}`).value = totalAmountBeforeDiscount;

    // 余ったシートを削除
    while (workbook.getWorksheet(`内訳明細 (${++currSheetIdx})`)) {
      workbook.removeWorksheet(`内訳明細 (${currSheetIdx})`);
    }
  })();


  /************
   * 見積書明細
   * **********/
  (function shDetails() {
    const sheetNamePrefix = '見積書明細';
    let currRowIdx = 1;
    let currSheetIdx = 1;

    let ws = initializeWorksheet(`${sheetNamePrefix} (${currSheetIdx})`);
   

    const nextSheet = () => {
      currRowIdx = 1;
      ws = initializeWorksheet(`${sheetNamePrefix} (${++currSheetIdx})`);
    };

    for (const [key, value] of groupedEstItems) {

      if (currRowIdx > maxRows) {
        nextSheet();
      }

      let rowIdx =  currRowIdx + rowOffset;

      const {
        items: estItems,
        groupAmountBeforeTax,
      } = value;


      // 大項目タイトル
      ws.getCell(`A${rowIdx}`).value = `■${key}`;
      currRowIdx++;

      // 項目ごと
      for (const { 
        中項目, 
        部材名,
        // 部材備考 ⇒　これを含むかどうか、要検討
        単位,
        数量,
        単価,
        備考,
        rowUnitPriceBeforeTax,
      } of estItems) {
        if (currRowIdx > maxRows) {
          nextSheet();
        }

        rowIdx =  currRowIdx + rowOffset;
        ws.getCell(`A${rowIdx}`).value = ` ${中項目.value}`;
        ws.getCell(`C${rowIdx}`).value = `${部材名.value}`;
        ws.getCell(`D${rowIdx}`).value = `${単位.value}`;
        ws.getCell(`E${rowIdx}`).value = +数量.value;
        ws.getCell(`F${rowIdx}`).value = +単価.value;
        ws.getCell(`G${rowIdx}`).value = rowUnitPriceBeforeTax;
        ws.getCell(`H${rowIdx}`).value = `${備考.value}`;
        currRowIdx++;
      }

      if (currRowIdx > maxRows) {
        nextSheet();
      }

      rowIdx =  currRowIdx + rowOffset;

      // 小計
      ws.getCell(`A${rowIdx}`).value = '          《 小 計 》';
      ws.getCell(`G${rowIdx}`).value = groupAmountBeforeTax;
      currRowIdx++;
    }

    const totalHeaderCell = ws.getCell('A22');
    totalHeaderCell.font = { bold: true };
    totalHeaderCell.value = '          《 合 計 》'; 
    ws.getCell('G22').value = totalAmountBeforeDiscount;
    
   
    // 余ったシートを削除
    while (workbook.getWorksheet(`${sheetNamePrefix} (${++currSheetIdx})`)) {
      workbook.removeWorksheet(`${sheetNamePrefix} (${currSheetIdx})`);
    }
  })();


  return {
    dataId: estDataId,
    projName: projName.value,
    workbook,
  };
};