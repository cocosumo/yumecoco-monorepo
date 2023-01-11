
import xlsx from 'xlsx';
import path from 'path';
/**
 * Validate if file is valid 見積書 from daikoku
 *
 * Does not include existence of contents in database
 *
 * @param file
 */
export const validateFile = async (file: ArrayBuffer) => {
  const workbook = xlsx.read(file);

  xlsx.writeFile(workbook, path.join(__dirname, 'test.xlsx'));
};