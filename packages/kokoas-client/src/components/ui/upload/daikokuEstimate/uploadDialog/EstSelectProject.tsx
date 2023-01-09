import { Chip } from '@mui/material';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { RiFileExcel2Fill } from 'react-icons/all';
import { green } from '@mui/material/colors';
export const EstSelectProject = (props: useFileUploadHook) => {

  const {
    fileNames,
    clearAllFiles,
  } = props;

  return (
    <Chip
      avatar={<RiFileExcel2Fill color={green[700]} />}
      label={fileNames[0]}
      onDelete={clearAllFiles}
    />
  );
};