import path from 'path';
import fs from 'fs';

type FileName =
| '見積書'
| '請負契約書'
| '工事請負契約約款'
| '請求書';


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
  [
    fileType,
    version,
  ].forEach((value) => {
    if (value.includes('/') || value.includes('\\') || value.includes('..')) {
      throw new Error('不正なファイルパス');
    }
  });

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

  const filePath = path.join(__dirname, assetFolder, `${fileName}${version}.${fileType}`);


  if (fs.existsSync(filePath)) {
    return filePath;
  } else {
    throw new Error(`${fileName} does not exist.`);
  }
};

