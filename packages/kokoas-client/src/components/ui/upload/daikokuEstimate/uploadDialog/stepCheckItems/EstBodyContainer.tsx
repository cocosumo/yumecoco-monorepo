import { Box, BoxProps } from '@mui/material';

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
      }}
      {...otherProps}
    />
  );
};