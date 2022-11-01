import { TableBody } from '@mui/material';
import { EstimatesRow } from './EstimatesRow';

export const EstimatesBody = () => {
  return (
    <TableBody>
      <EstimatesRow />
      <EstimatesRow />
      <EstimatesRow />
      <EstimatesRow />
    </TableBody>
  );
};