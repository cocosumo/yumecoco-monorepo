import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { SubTotalRow } from './SubTotalRow';

export const SubTotalTable = () => {
// <-- テストデータです。計算のHookはここに入れ替えます。
  const rows: Array<[string, number]>
   = [
     ['建材・新建材', 28110.72 ],
     ['補修工事', -6533 ],
     ['金物工事', 5280  ],
     ['家具工事', 256256 ],
   ];
  // テストデータ -->

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>大項目</TableCell>
            <TableCell align='right'>大項目小計</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(([key, value])=> <SubTotalRow key={key} majorItem={key} value={value} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};