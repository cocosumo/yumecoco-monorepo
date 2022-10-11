import SendIcon from '@mui/icons-material/Send';
import {  Button, Tooltip } from '@mui/material';
import { useStartContractProcess } from '../../../hooks/useStartContractProcess';

export const StartContract = ()=>{

  const {
    handleClickStart,

    values,
  } = useStartContractProcess();

  const {  projId } = values;

  return (
    <Tooltip title="契約書を送信する" arrow>
      <div>
        {/* Tooltip doesn't like disabled element, so I added extra layer */}
        <Button
          disabled={!projId}
          onClick={handleClickStart}
          variant="contained"
        >
          <SendIcon />
        </Button>
      </div>
    </Tooltip>
  );
};