

import { FaRegFilePdf } from '@react-icons/all-files/fa/FaRegFilePdf';
import { FaRegFileExcel } from '@react-icons/all-files/fa/FaRegFileExcel';
import { FaRegFileImage } from '@react-icons/all-files/fa/FaRegFileImage';
import { FaRegFile } from '@react-icons/all-files/fa/FaRegFile';
import { FaRegFileVideo } from '@react-icons/all-files/fa/FaRegFileVideo';

export const FileIcon = ({ 
  fileName, 
}:{
  fileName: string;
}) => {
  const fileExtension = fileName.split('.').pop();

  switch (fileExtension) {
    case 'pdf':
      return <FaRegFilePdf />;
    case 'xlsx':
    case 'xls':
      return <FaRegFileExcel />;
    case 'jpg':
    case 'png':
    case 'gif':
    case 'jpeg':
      return <FaRegFileImage />;
    case 'mp4':
    case 'mov':
    case 'avi':
      return <FaRegFileVideo />;
    default:
      return <FaRegFile />;  
  }
};
