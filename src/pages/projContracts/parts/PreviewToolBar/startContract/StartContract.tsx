import { sendContract } from '../../../api/docusign/sendContract';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useConfirmDialog, useSnackBar } from '../../../../../hooks';
import { Button, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../../form';
import { useBackdrop } from '../../../../../hooks/useBackdrop';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../../Router';
import { generateParams } from '../../../../../helpers/url';
import { useStartContractProcess } from '../../../hooks/useStartContractProcess';



export const StartContract = ({
  projId,
  isBusy,
}: {
  projId: string,
  isBusy: boolean,
})=>{

  const {handleClickStart} = useStartContractProcess()

  return (
    <Tooltip title="契約書を送信する" arrow>
      <div>
        {/* Tooltip doesn't like disabled element, so I added extra layer */}
        <LoadingButton
          disabled={!projId || isBusy}
          loading={open}
          onClick={handleConfirmSend}
          variant="contained"
          loadingPosition="center"
        >
          <SendIcon />
        </LoadingButton>
      </div>
    </Tooltip>
  );
};