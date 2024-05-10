import path from 'path';
import fs from 'fs';
import sanitize from 'sanitize-filename';

type FileName =
| '見積書'
| '請負契約書'
| '工事請負契約約款'
| '請求書'
| '原価見積'
| '工事依頼書'
| '工事依頼書請負書';


export const getFilePath = ({
  fileName,
  fileType = 'pdf',
  version = '',
} : {
  fileName: FileName,
  fileType?: 'pdf' | 'xls' | 'xlsx',
  version?: string
}) => {

  // js/path-injection攻撃に対する対策
  const sanitizedFileType = sanitize(fileType);
  const sanitizedVersion = sanitize(version);  

  let assetFolder = '';

  switch (fileType) {
    case 'xls':
    case 'xlsx':
      assetFolder = 'excel';
      break;
    default:
      assetFolder = fileType;
      break;
  }

  const filePath = path.join(__dirname, assetFolder, `${fileName}${sanitizedVersion}.${sanitizedFileType}`);


  if (fs.existsSync(filePath)) {
    return filePath;
  } else {
    throw new Error(`${fileName} does not exist.`);
  }
};

