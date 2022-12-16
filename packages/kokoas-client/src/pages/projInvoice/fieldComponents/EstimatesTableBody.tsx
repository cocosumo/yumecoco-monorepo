import { TableCell, TableRow } from '@mui/material';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { EstimateList } from 'kokoas-client/src/hooksQuery';
import { roundTo } from 'libs';
import { getEstimatesFieldName, TMaterials } from '../form';

export const EstimateTableBody = ({
  estimateRow,
  invoices,
}: {
  estimateRow: TMaterials
  invoices: {
    records: DBInvoices.SavedData[];
    totalInvoice: EstimateList[];
  } | undefined
}) => {



  return (
    <TableRow>
      <TableCell>
        {/* 工事種別 */}
      </TableCell>
      <TableCell align="right">
        {/* 枝番号 */
          estimateRow.dataId.split('-').at(-1)
        }
      </TableCell>
      <TableCell align="right">
        {/* 契約金額 */
          roundTo(+estimateRow.amountPerContract).toLocaleString()
        }
      </TableCell>
      <TableCell align="right">
        {/* 請求済み金額 */
          invoices?.totalInvoice.reduce((acc, cur) => {
            if (estimateRow.dataId !== cur.dataId) return acc;
            return acc + +cur.billedAmount;
          }, 0)
            .toLocaleString()
        }
      </TableCell>
      <TableCell>
        {/* 請求に使用する */

        }
        <FormikLabeledCheckBox
          name={getEstimatesFieldName(+estimateRow.estimateIndex, 'isForPayment')}
        />
      </TableCell>
    </TableRow>
  );
};