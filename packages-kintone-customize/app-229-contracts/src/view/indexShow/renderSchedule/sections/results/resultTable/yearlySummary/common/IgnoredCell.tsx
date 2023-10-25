import { TableCell } from '@mui/material';
import { grey } from '@mui/material/colors';

export const IgnoredCell = () => {
  return (
    <TableCell 
      sx={{
        backgroundImage: `linear-gradient(
          to top right,
          ${grey[400]} calc(50% - 0.5px),
          ${grey[700]},
          ${grey[400]} calc(50% + 0.5px)
        );`,
        
      }}
    />
  );
};