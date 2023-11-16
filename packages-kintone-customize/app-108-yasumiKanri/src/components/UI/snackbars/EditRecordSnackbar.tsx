import { Alert, Button, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import DescriptionIcon from '@mui/icons-material/Description';
import { getKintoneDuration, getKintoneStatus, getKintoneType } from '../../../helpers/converters';
import { toLocaleDate } from '../../../helpers/time';
import { isMobile } from 'api-kintone';


const recordPath = (recordId: string) => (recordId ? `show${isMobile() ? '?' : '#'}record=${recordId}` : '');

const onActionClick = (id:string) => {
  window.open(`${recordPath(id)}&mode=show`, '_blank');
};

const resolveMessage = (type: any, status: any) => {
  if (type?.includes('leave')) {
    let kintoneStatus = getKintoneStatus(status);
    if (kintoneStatus && kintoneStatus.includes('承認')) {
      kintoneStatus += '済';
    }
    return `${getKintoneType(type)}が${kintoneStatus}です。`;
  }

  return '今月の休みの変更は申請が必要です。';
};

const EditRecordSnackbar = ({
  editRecordSnack,
  setEditRecordSnack,
}:{
  editRecordSnack: any,
  setEditRecordSnack: any,
}) => {
  const { isOpen, data, date } = editRecordSnack;
  const {
    id, type, duration, status,
  } = data;

  const message = resolveMessage(type, status);
  const severityType = 'info'; // type?.includes('leave') ? 'info' : 'warning';

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setEditRecordSnack((prev: any) => ({ ...prev, isOpen: false }));
  };

  const action = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      startIcon={<DescriptionIcon />}
      onClick={() => onActionClick(id)}
      sx={{ minWidth: 80 }}
    >
      詳細
    </Button>
  );

  return (
    <div>
      <Snackbar
        key={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={3000}
        transitionDuration={500}
        onClose={handleClose}
      >
        <Alert sx={{ fontSize: 14 }} onClose={handleClose} variant="filled"
          severity={severityType} action={action}
        >
          <AlertTitle sx={{ fontSize: 16 }}>
            {`${toLocaleDate(date)}(${getKintoneDuration(duration)})`}
          </AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditRecordSnackbar;
