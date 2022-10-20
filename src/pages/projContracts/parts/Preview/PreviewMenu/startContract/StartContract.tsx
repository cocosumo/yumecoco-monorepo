import SendIcon from '@mui/icons-material/Send';
import {  Button } from '@mui/material';
import { useStartContractProcess } from '../../../../hooks/useStartContractProcess';

export const StartContract = ()=>{

  const {
    handleClickStart,
  } = useStartContractProcess();


  return (
    <Button
      variant="outlined"
      onClick={handleClickStart}
      startIcon={<SendIcon />}
    >
      契約を作成する
    </Button>

  );
};