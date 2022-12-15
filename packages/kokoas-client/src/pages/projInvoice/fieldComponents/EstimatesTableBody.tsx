import { TableCell, TableRow } from '@mui/material';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { roundTo } from 'libs';
import { getEstimatesFieldName, TMaterials } from '../form';

export const EstimateTableBody = ({
  estimateRow,
  idx,
}: {
  estimateRow: TMaterials
  idx: number
}) => {



  return (
    <TableRow>
      <TableCell>
        {/* 工事種別 */}
      </TableCell>
      <TableCell align="right">
        {/* 枝番号 */
          estimateRow.dataId.split('-')[2]
        }
      </TableCell>
      <TableCell align="right">
        {/* 契約金額 */
          roundTo(+estimateRow.contractAmount).toLocaleString()
        }
      </TableCell>
      <TableCell align="right">
        {/* 請求済み金額 */
          roundTo(+estimateRow.billedAmount).toLocaleString()
        }
      </TableCell>
      <TableCell>
        {/* 請求に使用する */

        }
        <FormikLabeledCheckBox
          name={getEstimatesFieldName(idx, 'isForPayment')}
        />
      </TableCell>
    </TableRow>
  );
};