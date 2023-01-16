import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ItemCell = (props : TypographyProps) => {
  const {
    color = grey[900],
    fontSize = 12,
  } = props;
  return (
    <Typography
      {...props}
      color={color}
      fontSize={fontSize}
    />
  );
};