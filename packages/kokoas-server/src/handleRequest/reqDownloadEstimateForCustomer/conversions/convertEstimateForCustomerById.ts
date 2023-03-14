import { calculateEstimateRecord, getCustGroupById, getEstimateById, getProjById } from 'api-kintone';
import { getFilePath } from 'kokoas-server/src/assets';
import excel from 'exceljs';
import { addressBuilder, formatDataId } from 'libs';


export const convertEstimateForCustomerById = async (estimateId: string) => {
  if (!estimateId) throw new Error('見積もりIDが提供されていません');
  const estimateRec = await getEstimateById(estimateId);

  if (!estimateRec) throw new Error(`見積もりは見つかりませんでした： ${estimateId}`);

  const {
    custGroupId,
    projId,
    dataId,
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
  (function frontPage() {
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
  (function summary() {
    console.log(totalDiscountAmount);
  })();

  return workbook;
};