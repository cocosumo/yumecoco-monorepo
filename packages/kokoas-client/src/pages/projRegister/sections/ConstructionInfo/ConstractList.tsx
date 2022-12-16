import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


interface ConstractListProps {
  data: DBProjestimates.SavedData[] | undefined
}

export const ConstractList = (props: ConstractListProps) => {
  const { data } = props;

  const tableHeadder = ['ステータス', 'id', '契約日', '利益額・率'];


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadder.map((item) => (
              <TableCell key={item} align="right">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map(({ envStatus, $id, estimateStatus, contractDate, totalPaymentAmt }) => (
            envStatus.value !== '' &&
            <TableRow key={$id.value}>
              <TableCell component="th" scope="row">
                <Chip size='small' color='info' label={estimateStatus.value} />
              </TableCell>
              <TableCell align="right">
                {$id.value}
              </TableCell>
              <TableCell align="right">
                {contractDate.value}
              </TableCell>
              <TableCell align="right">
                {Math.round(+(totalPaymentAmt.value)).toLocaleString() + '円'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};