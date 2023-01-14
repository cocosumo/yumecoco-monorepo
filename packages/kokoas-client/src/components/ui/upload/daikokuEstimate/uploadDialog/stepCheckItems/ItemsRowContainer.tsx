import { Stack, StackProps } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';

export const ItemsRowContainer = (props: StackProps & {
  rowIdx: number,
  rowSize: number,
  rowStart: number,
}) => {

  const {
    rowIdx,
    rowSize,
    rowStart,
    ...otherProps
  } = props;

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      py={2}
      spacing={1}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minWidth: '600px',
        background: rowIdx % 2 ? grey[50] : undefined,
        '&:focus-within': {
          background: yellow[50],
        },
        transition: 'all 0.5s',
        height: `${rowSize}px`,
      }}
      style={{
        transform: `translateY(${rowStart}px)`,
      }}
      {...otherProps}
    />
  );
};