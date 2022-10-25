import { Chip, IconButton, Stack, TableCell, TableRow } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const EstimatesRow = () => {
  return (
    <TableRow>
      <TableCell>
        74
      </TableCell>
      <TableCell>
        <Stack spacing={1} direction={'row'}>
          <Chip size='small' color='info' label="銀行用" />
          <Chip size='small' color='success' label="規約" />
        </Stack>
      </TableCell>
      <TableCell>
        {'2022年10月22日'}
      </TableCell>
      <TableCell align={'right'}>
        {'500,000 円'}
      </TableCell>
      <TableCell align={'right'}>
        {'1,000,000 円'}
      </TableCell>
      <TableCell align={'right'}>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};