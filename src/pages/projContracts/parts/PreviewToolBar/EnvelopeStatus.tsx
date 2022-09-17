import { Chip, Grow, Tooltip, CircularProgress } from '@mui/material';
import { jaEnvelopeStatus } from '../../../../lib';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { getFormDataById } from '../../api/fetchRecord';
import { useSnackBar } from '../../../../hooks';


export const EnvelopeStatus = (
  { envStatus, loading, isVisible } :
  {
    envStatus: TEnvelopeStatus,
    loading: boolean,
    isVisible: boolean,
  },

) => {
  const { setValues, values: { projId, revision } } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const [disabled, setDisabled] = useState(false);

  const { ja, desc } = jaEnvelopeStatus(envStatus);

  const isShow = !loading && !!ja && isVisible;

  const handleRefresh = async () => {
    setDisabled(true);
    const newData = await getFormDataById(projId);
    setValues(newData);
    setTimeout(()=>{
      setSnackState({
        open: true,
        message: `リフレッシュしました。revision: ${revision}`,
        severity: 'success',
      });
      setDisabled(false);
    }, 2000);
  };

  if (isShow) return (
    <Grow in={isShow}>
      <Tooltip title={desc + 'クリックすれば、リフレッシュ出来ます'} >
        <Chip
          icon={disabled ? <CircularProgress size={18} /> : <RefreshIcon />}
          label={ja}
          color="secondary"
          onClick={handleRefresh}
          disabled={disabled}
        />
      </Tooltip>
    </Grow>
  );

  return <div />;
};