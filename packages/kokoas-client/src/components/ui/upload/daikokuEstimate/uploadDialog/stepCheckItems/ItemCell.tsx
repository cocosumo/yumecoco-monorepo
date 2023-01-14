import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ItemCell = (props : TypographyProps) => {
  return (
    <Typography
      {...props}
      color={grey[900]}
      fontSize={12}
    />
  );
};