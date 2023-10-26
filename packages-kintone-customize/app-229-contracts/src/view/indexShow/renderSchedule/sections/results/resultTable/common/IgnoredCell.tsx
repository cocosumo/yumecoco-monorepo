import { TableCell, TableCellProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const IgnoredCell = ({
  bgColor = grey[400],
  ...others
}: TableCellProps & {
  bgColor?: string
}) => {
  return (
    <TableCell 
      {...others}
      sx={{
        backgroundImage: `linear-gradient(
          to top right,
          ${bgColor} calc(50% - 0.5px),
          ${grey[700]},
          ${bgColor} calc(50% + 0.5px)
        );`,
        
      }}
    />
  );
};