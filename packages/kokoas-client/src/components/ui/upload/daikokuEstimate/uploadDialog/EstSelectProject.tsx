import { Chip, Stack } from '@mui/material';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { green } from '@mui/material/colors';
import { SearchProjects } from '../../../textfield';


export const EstSelectProject = (props: useFileUploadHook) => {

  const {
    fileNames,
    clearAllFiles,
  } = props;

  return (
    <Stack
      spacing={2}
      width={'80%'}
      justifyContent={'flex-start'}
    >
      <Chip
        avatar={<RiFileExcel2Fill color={green[700]} />}
        label={fileNames[0]}
        onDelete={clearAllFiles}
        sx={{
          maxWidth: 200,
        }}
      />
      <SearchProjects label='工事検索' fullWidth />
    </Stack>
  );
};