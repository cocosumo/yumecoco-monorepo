import { Button, Stack } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { RecordCancelStatus, recordCancelStatuses } from 'types';
import { useUpdateCancelStatus } from '../../hooks/useUpdateCancelStatus';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import CancelIcon from '@mui/icons-material/Cancel';

const getCancelIcon = (cancelStatus: RecordCancelStatus) => {
  switch (cancelStatus) {
    case '中止':
      return <CancelIcon />;
    case '他決':
      return <MoveDownIcon />;
    case '削除':
      return <DeleteIcon />;
    default:
      return '';
  }
};

export const CancelStatus = () => {
  const {
    updateCancelStatus,
  } = useUpdateCancelStatus();

  const cancelStatus = useTypedWatch({
    name: 'cancelStatus',
  }) as RecordCancelStatus;

  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      {recordCancelStatuses.map((item) => (
        <Button
          key={item}
          onClick={() => updateCancelStatus(item)}
          variant={cancelStatus?.includes(item) ? 'contained' : 'outlined'}
          color={cancelStatus?.includes(item) ? 'error' : 'primary'}
          startIcon={getCancelIcon(item)}
        >
          {item}
        </Button>
      ))}

    </Stack>
  );

};