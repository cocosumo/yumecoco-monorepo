import SendIcon from '@mui/icons-material/Send';
import {  Button } from '@mui/material';
import { useStartContractProcess } from '../../../../hooks/useStartContractProcess';

export const StartContract = ({
  handleClosePreview,
} : {
  handleClosePreview: () => void
})=>{

  const {
    handleClickStart,
  } = useStartContractProcess({ handleClosePreview });


  return (
    <Button
      variant="outlined"
      onClick={handleClickStart}
      startIcon={<SendIcon />}
    >
      契約を印刷する
    </Button>

  );
};