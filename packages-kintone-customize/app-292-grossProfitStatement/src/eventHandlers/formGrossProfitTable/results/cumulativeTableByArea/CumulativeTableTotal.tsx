import { Stack, Table, TableBody, TableHead, Typography } from '@mui/material';
import { TableRowLayout } from './TableRowLayout';
import { SummaryContracts } from '../../../helpers/getSummaryContracts';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { useAreaNameById } from '../hooks/useAreaNameById';
import { useCumulativeTableTotal } from '../hooks/useCumulativeTableTotal';


/** 対象期間の累計表を表示する */
export const CumulativeTableTotal = ({
  contractData,
}: {
  contractData: SummaryContracts[]
}) => {
  const [
    year,
    period,
    area,
  ] = useTypedWatch({
    name: [
      'year',
      'months',
      'storeIds',
    ],
  }) as [
    string,
    string[],
    string[],
  ];

  const storeNames = useAreaNameById(area);

  const tableLabel = `${year}年度 ${storeNames ? storeNames : ''}	契約累積表`;

  const viewDate = useCumulativeTableTotal({
    contractData,
    area,
  });

  return (
    <Stack spacing={1}>
      <Typography variant='h5'>
        {tableLabel}
      </Typography>

      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRowLayout
            label
            shinchiku
            reform
            shinchikuhutai
            taiyouko
            others
            total
            key={'CumulativeTableTotal.header'}
          />
        </TableHead>
        <TableBody>
          {/* contractData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.calories}
              </TableCell>
              <TableCell align="right">
                {row.fat}
              </TableCell>
              <TableCell align="right">
                {row.carbs}
              </TableCell>
              <TableCell align="right">
                {row.protein}
              </TableCell>
            </TableRow>
          )) */}
        </TableBody>
      </Table>
    </Stack>
  );
};
