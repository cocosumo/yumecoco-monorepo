import { Button, Stack } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';
import { pages } from '../../Router';

export const NextStepChoices = ({ recordId }: {
  recordId?: string,
}) => {
  const { handleClose } = useConfirmDialog();
  const navigate = useNavigate();

  return (
    <Stack width={300} spacing={2}>
      <Button
        variant='outlined'
        fullWidth
        onClick={()=> {
          handleClose();
          navigate(`${pages.projProspect}?projId=${recordId}`);
        }}
      >
        見込み登録

      </Button>
      <Button
      variant='outlined'
      fullWidth
        onClick={()=>{
          handleClose();
          navigate(`${pages.projContractPreview}?projId=${recordId}`);
        }}
      >
        契約登録
      </Button>
    </Stack>
  );

};