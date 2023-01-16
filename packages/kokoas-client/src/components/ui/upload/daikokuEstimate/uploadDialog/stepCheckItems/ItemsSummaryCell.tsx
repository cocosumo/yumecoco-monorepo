import { Chip, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const ItemsSummaryCell = ({
  header,
  value,
  daikokuValue,
  unit = '円',
}: {
  header: ReactNode,
  value: number,
  daikokuValue: number,
  unit?: '円' | '%'
}) => {

  const isSame = daikokuValue === value;

  return (
    <Stack>
      <Typography textAlign={'center'} fontSize={12} color={grey[400]}>
        {header}
      </Typography>

      <Tooltip title={`当システムで計算した数字です。大黒さんは ${daikokuValue.toLocaleString()} ${unit} です。`}>
        <Chip
          label={`${value.toLocaleString()} ${unit}`}
          size={'small'}
          color={isSame ? 'success' : 'warning'}
          variant={'outlined'}
        />
      </Tooltip>
    </Stack>
  );
};