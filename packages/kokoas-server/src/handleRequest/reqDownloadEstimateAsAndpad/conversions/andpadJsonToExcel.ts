import { EstimateToAndpadJsonSchema } from './estimateToAndpadJson';
import Excel from 'exceljs';


export const andpadJsonToExcel = (json: EstimateToAndpadJsonSchema) => {

  const wb = new Excel.Workbook();

  const ws = wb.addWorksheet('見積もり');

  const columns = Object.keys(json.rows[0]).map((key) => {
    return {
      header: key,
      key,
      width: 20,
    };
  });

  ws.columns = columns;

  ws.addRows(json.rows);

  return wb;

};