import { Typography } from '@mui/material';
import { FileIcon } from 'kokoas-client/src/components/ui/icons/FileIcon';


export const StyledFileIcon = ({ 
  fileName, 
}:{
  fileName: string;
}) => {
  return (
    <Typography 
      color={'secondary'} 
      component={'span'}
      fontSize={32}
      display={'block'}
      textAlign={'center'}
    >
      <FileIcon fileName={fileName} />
    </Typography>
  );
};