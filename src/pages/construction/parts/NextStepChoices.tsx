import { Button, Stack } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnackBar } from '../../../hooks';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';
import { pages } from '../../Router';

export const NextStepChoices = ({ recordId }: {
  recordId?: string,
}) => {
  const { setSnackState } = useSnackBar();
  const { handleClose } = useConfirmDialog();
  const navigate = useNavigate();

  console.log('recordId', recordId, useParams(), useLocation());
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
          setSnackState({ open: true, message: 'まだ作成中です', severity: 'warning' });
        }}
      >
        契約登録
      </Button>
    </Stack>
  );

};