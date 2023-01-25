import { Chip, Stack, Tooltip } from '@mui/material';
import { ItemCell } from './ItemCell';

export const ItemCellCompared = ({
  unit = '円',
  value,
  daikokuValue,
}: {
  value: number,
  daikokuValue: number,
  unit?: '円' | '%'
}) => {

  const isSame = value === daikokuValue;

  const formatedValue = `${value.toLocaleString()} ${unit}`;
  const formatedDaikokuValue = `${daikokuValue.toLocaleString()} ${unit}`;

  return (
    <Stack>
      <Tooltip title={`当システムで計算した数字です。大黒さんは ${formatedDaikokuValue} です。`}>
        <Chip
          variant='outlined'
          size='small'
          label={formatedValue}
          color={isSame ? 'success' : 'warning'}
        />
      </Tooltip>
      {!isSame && (
        <ItemCell textAlign='center' variant={'caption'}>
          {formatedDaikokuValue}
        </ItemCell>)}
    </Stack>
  );
};