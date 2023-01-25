import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const EstHeaderCell = (props: TypographyProps) => {
  return (
    <Typography
      {...props}
      color={grey[700]}
    />
  );
};