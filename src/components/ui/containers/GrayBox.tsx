import { Box, BoxProps } from '@mui/material';


export const GrayBox = (props: BoxProps) => {
  const {
    children,
    p = 2,
    borderRadius = 2,
    bgcolor = '#f5f5f5',
    ...others
  } = props;
  return (
    <Box
      {...others}
      borderRadius={borderRadius}
      bgcolor={bgcolor}
      p={p}
    >
      {children}
    </Box>
  );
};

export default GrayBox;