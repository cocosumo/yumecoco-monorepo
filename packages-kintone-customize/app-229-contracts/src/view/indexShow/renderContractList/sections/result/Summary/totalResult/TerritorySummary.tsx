import { Divider, Stack, TableCell, TableRow } from '@mui/material';
import { ValueWithUnit } from './ValueWithUnit';

export const TerritorySummary = ({
  territory,
  value,
  records,
}: {
  territory: string,
  value: number,
  records: DB.SavedRecord[],
}) => {

  return (
    <TableRow>
      <TableCell 
        component={'th'}
      >
        {territory}
        エリア総合計(税込)
      </TableCell>
      <TableCell align='right'>
        <Stack 
          direction={'row'} 
          justifyContent={'space-between'}
          divider={<Divider orientation="vertical" flexItem />}

        >
          
          <ValueWithUnit
            value={records.length}
            unit={'件'}
            width='20%'
          />
          <ValueWithUnit
            value={value}
            unit={'円'}
            width='70%'
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};