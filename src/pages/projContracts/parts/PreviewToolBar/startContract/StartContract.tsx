import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {  Tooltip } from '@mui/material';
import { useStartContractProcess } from '../../../hooks/useStartContractProcess';

export const StartContract = ({
  isBusy,
}: {
  isBusy: boolean,
})=>{

  const {
    handleClickStart,
    isBackdropOpen,
    values,
  } = useStartContractProcess();

  const {  projId } = values;

  return (
    <Tooltip title="契約書を送信する" arrow>
      <div>
        {/* Tooltip doesn't like disabled element, so I added extra layer */}
        <LoadingButton
          disabled={!projId || isBusy}
          loading={isBackdropOpen}
          onClick={handleClickStart}
          variant="contained"
          loadingPosition="center"
        >
          <SendIcon />
        </LoadingButton>
      </div>
    </Tooltip>
  );
};