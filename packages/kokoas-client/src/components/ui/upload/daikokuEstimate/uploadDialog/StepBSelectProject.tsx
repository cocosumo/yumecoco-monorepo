import { Button, Chip, Stack, Typography } from '@mui/material';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';
import { green } from '@mui/material/colors';
import { SearchProjects } from '../../../textfield';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useStableNavigate } from 'kokoas-client/src/hooks/useStableNavigate';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const StepBSelectProject = (
  props: useFileUploadHook & {
    projId?: string,
    handleNext: () => void,
    handleReset: () => void
  },
) => {
  const navigate = useStableNavigate();
  const {
    fileNames,
    projId,
    handleReset,
  } = props;

  console.log(projId);
  return (
    <Stack
      spacing={2}
      width={'80%'}
      alignItems={'center'}
    >
      <Typography>
        添付した見積はどの工事にアップロードしますか？
      </Typography>
      <SearchProjects
        label='工事検索'
        fullWidth
        onChange={(_, value) => {
          navigate(`?${generateParams({ projId: value?.id })}`);
        }}
      />
      <Chip
        avatar={<RiFileExcel2Fill color={green[700]} />}
        label={fileNames[0]}
        onDelete={handleReset}
        sx={{
          maxWidth: 200,
        }}
      />
      <Button
        size={'large'}
        variant={'text'}
        endIcon={<NavigateNextIcon />}
      >
        次へ
      </Button>
    </Stack>
  );
};