import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ItemsTHeadCell = (props: TypographyProps) => {
  const {
    color = grey[700],
  } = props;

  return (
    <Typography
      {...props}
      color={color}
    />
  );
};