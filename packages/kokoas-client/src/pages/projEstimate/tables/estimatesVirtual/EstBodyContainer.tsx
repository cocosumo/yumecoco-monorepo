import { Box, BoxProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const EstBodyContainer = (
  props: BoxProps & {
    height: number,
  }) => {

  const {
    height,
    ...otherProps
  } = props;

  return (
    <Box
      sx={{
        height: `${height}px`,
        width: '100%',
        position: 'relative',
        border:1,
        borderColor: grey[200],
        borderRadius: 1,
      }}
      {...otherProps}
    />
  );
};