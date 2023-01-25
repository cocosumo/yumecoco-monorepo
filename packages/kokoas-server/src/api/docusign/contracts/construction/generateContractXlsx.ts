import { getContractData } from '../../../kintone/getContractData';
import excel from 'exceljs';
import { getFilePath } from 'kokoas-server/src/assets';

/**
 * Generate Contract in excel
 *
 * @param contractData Derived from getContractData
 * @param outputType 'buffer' | 'b64' | 'xlsx'
 * @returns {Buffer} for efficiency
 * @returns {string} B64 - Widely supported. (Kintone only supports this)
 * @returns {excel.Xlsx} exeljs object, good if further manipulation is required
 */
export const generateContractXlsx = async (
  contractData : Awaited<ReturnType<typeof getContractData>>,
  outputType: 'buffer' | 'b64' | 'xlsx' = 'xlsx',
) => {
  const {
    projId, projLocation, projName,
    cocoAG,
  } = contractData;

  const {
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const ukeoiFile = getFilePath({
    fileName: '請負契約書',
    fileType: 'xlsx',
  });

  // Read excel file.
  let workbook = new excel.Workbook();
  workbook = await workbook.xlsx.readFile(ukeoiFile);
  const ws = workbook.getWorksheet('契約書');

  // 工事番号
  ws.getCell('H2').value = projId;

  // 工事番号
  ws.getCell('K16').value = projLocation;

  // 工事名
  ['M2', 'G14']
    .forEach((c) => ws.getCell(c).value = projName);

  // 発注者
  /* ['G9', 'K41']
    .forEach((c) => ws.getCell(c).value = `${custName} 様`); */

  // 発注者の住所
  // ws.getCell('K40').value = custAddress;

  // 担当者名
  ws.getCell('K46').value = officerName;


  switch (outputType) {
    case 'b64':
      return Buffer.from(await workbook.xlsx.writeBuffer())
        .toString('base64');
    case 'buffer':
      return workbook.xlsx.writeBuffer();
    case 'xlsx':
      return workbook.xlsx;
  }
};
