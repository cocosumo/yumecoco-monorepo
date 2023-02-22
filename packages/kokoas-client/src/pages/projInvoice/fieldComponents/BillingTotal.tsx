import { Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow, Typography, TypographyVariant } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { BillingTotalBody } from './BillingTotalBody';


interface BillingTotalTbl {
  label: string,
  align: TableCellProps['align'],
  variant: TypographyVariant,
}

const tblLabel: BillingTotalTbl[] = [{
  label: '請求合計',
  align: 'left',
  variant: 'body1',
}, {
  label: '項目',
  align: 'left',
  variant: 'caption',
}, {
  label: '金額',
  align: 'right',
  variant: 'caption',
}];


export const BillingTotal = () => {

  const { values } = useFormikContext<TypeOfForm>();
  const { estimates } = values;


  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tblLabel.map((item) => {
              return (
                <TableCell align={item.align} key={item.label}>
                  <Typography variant={item.variant}>
                    {item.label}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <BillingTotalBody
            estimates={estimates}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
