import { IconButton, CircularProgress, Grow, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useFormikContext } from 'formik';
import { useSnackBar } from '../../../../hooks';
import { useState } from 'react';
import { getFormDataById } from '../../api/fetchRecord';
import { TypeOfForm } from '../../form';

export const RefreshButton = (
  {  loading, isVisible } :
  {
    loading: boolean,
    isVisible: boolean,
  })=> {
  const { setValues, values: { projId, revision } } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const [disabled, setDisabled] = useState(false);

  const isShow = !loading && isVisible;

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


  return (
    <Grow in={isShow}>
      <Tooltip title={'このレコード再読み込みします。'}>

        <IconButton
          size='large'
          color="secondary"
          onClick={handleRefresh}
          disabled={disabled}
        >
          {disabled ? <CircularProgress size={18} /> : <RefreshIcon />}
        </IconButton>
      </Tooltip>
    </Grow>



  );
};