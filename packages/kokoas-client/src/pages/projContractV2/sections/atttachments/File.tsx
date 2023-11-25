import { Chip } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';

export const File = ({
  fileName,
}:{
  fileName: string,
  fileKey: string
  fileSize: number
  contentType: string
}) => {

  return (
    <Chip 
      label={fileName}
      size="small"
      icon={<AttachmentIcon />}
    />
  );
};