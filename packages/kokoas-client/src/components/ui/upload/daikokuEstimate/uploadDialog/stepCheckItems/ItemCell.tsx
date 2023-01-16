import { Tooltip, Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ItemCell = (props : TypographyProps<'div'>) => {
  const {
    color = grey[900],
    fontSize = 12,
    children,
  } = props;
  return (
    <Tooltip title={children}>
      <Typography
        {...props}
        color={color}
        fontSize={fontSize}
        overflow={'hidden'}
        whiteSpace={'nowrap'}
        textOverflow={'ellipsis'}
        component={'div'}
      >
        {children}
      </Typography>
    </Tooltip>
  );
};