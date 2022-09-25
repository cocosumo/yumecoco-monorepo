import { Button, Stack } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { generateParams } from '../../../helpers/url';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';
import { pages } from '../../Router';

export const NextStepChoices = ({ recordId }: {
  recordId?: string,
}) => {
  const { handleClose } = useConfirmDialog();
  const navigate = useNavigate();

  const urlParams = generateParams({
    projId: recordId,
  });

  return (
    <Stack width={300} spacing={2}>
      <Button
        variant='outlined'
        fullWidth
        onClick={()=> {
          handleClose();
          navigate(`${pages.projProspect}?${urlParams}`);
        }}
      >
        見込み登録

      </Button>
      <Button
        variant='outlined'
        fullWidth
        onClick={()=>{
          handleClose();
          navigate(`${pages.projEstimate}?${urlParams}`);
        }}
      >
        見積登録
      </Button>
    </Stack>
  );

};