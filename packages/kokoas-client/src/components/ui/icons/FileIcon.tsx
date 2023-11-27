import { 
  FaRegFilePdf, 
  FaRegFileExcel, 
  FaRegFileImage, 
  FaRegFile, 
} from 'react-icons/fa/';


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
    default:
      return <FaRegFile />;  
  }
};
