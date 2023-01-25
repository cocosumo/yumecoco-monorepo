import { Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { Caption } from 'kokoas-client/src/components';
import { TypeOfForm } from '../form';
import { BillingTotalBody } from './BillingTotalBody';


export const BillingTotal = () => {

  const { values } = useFormikContext<TypeOfForm>();
  const { estimates } = values;

  interface billingTotalTbl {
    label: string,
    align: TableCellProps['align'],
  }

  const tblLabel = [{
    label: '', /* 請求合計 */
    align: 'left',
  }, {
    label: '税抜',
    align: 'right',
  }, {
    label: '税込',
    align: 'right',
  }] as billingTotalTbl[];


  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tblLabel.map((item) => {
              return (
                <TableCell align={item.align} key={item.label}>
                  <Caption text={item.label} />
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