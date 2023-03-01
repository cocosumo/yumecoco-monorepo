import { TableCell, TableRow, Typography } from '@mui/material';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { roundTo } from 'libs';
import { getEstimatesFieldName, TMaterials } from '../form';

const CellContent = ({
  content,
  disabled,
}: {
  content: string | undefined
  disabled: boolean
}) => {
  return (
    <Typography
      variant='body2'
      color={!disabled ? 'text.primary' : 'gray'}
    >
      {content}
    </Typography>
  );
};

export const EstimateTableBody = ({
  estimateRow,
  isBilled,
}: {
  estimateRow: TMaterials
  isBilled: boolean
}) => {

  const {
    contractAmount,
    billedAmount,
  } = estimateRow;
  
  const isRefund = contractAmount < 0;
  const disabled = !isRefund ? contractAmount <= billedAmount : contractAmount >= billedAmount;


  return (
    <TableRow>
      <TableCell align="right">
        {/* 工事種別 */}
        {disabled &&
          <CellContent
            content={contractAmount > 0 ? '※全額請求済み' : '※全額返金済み'}
            disabled={disabled}
          />}
      </TableCell>
      <TableCell align="right">
        {/* 枝番号 */}
        <CellContent
          content={estimateRow.dataId.split('-').at(-1)}
          disabled={disabled || isBilled}
        />
      </TableCell>
      <TableCell align="right">
        {/* 契約金額 */}
        <CellContent
          content={roundTo(+estimateRow.contractAmount).toLocaleString()}
          disabled={disabled || isBilled}
        />
      </TableCell>
      <TableCell align="right">
        {/* 請求済み金額 */}
        <CellContent
          content={roundTo(+estimateRow.billedAmount).toLocaleString()}
          disabled={disabled || isBilled}
        />
      </TableCell>
      <TableCell align="right">
        {/* 作成済み金額 */}
        <CellContent
          content={roundTo(+estimateRow.createdAmount).toLocaleString()}
          disabled={disabled || isBilled}
        />
      </TableCell>
      <TableCell>
        {/* 請求に使用する */}
        <FormikLabeledCheckBox
          name={getEstimatesFieldName(+estimateRow.estimateIndex, 'isForPayment')}
          disabled={disabled || isBilled}
        />
      </TableCell>
    </TableRow>
  );
};