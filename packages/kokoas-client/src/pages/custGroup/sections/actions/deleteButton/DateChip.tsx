import { Tooltip } from '@mui/material';
import { CustomChip } from './CustomChip';

export const DateChip = ({
  dateStr,
}:{
  dateStr: string,
}) => {
  return (
    <Tooltip title={'契約日'}>
      <CustomChip 
        label={dateStr}
        color='secondary'
        variant='outlined'
      />

    </Tooltip>
  );
};