import xlsx from 'xlsx';



/**
 * Validate if file is valid 見積原価明細書 from daikoku
 * @param file
 */
export const validateFile = async (workbook: xlsx.WorkBook) => {
  try {
    const {
      J1: documentTitle,
    } = workbook.Sheets[workbook.SheetNames[0]];

    const correctDocumentTitle = '見積原価明細書';

    console.log('DOC TITLE', documentTitle?.v);

    if (documentTitle?.v !== correctDocumentTitle) {
      throw new Error(`大黒さんの見積ではありません。documentTitle = ${documentTitle}`);
    }

    return true;

  } catch (e) {
    throw new Error(`${e.message}`);
  }

};