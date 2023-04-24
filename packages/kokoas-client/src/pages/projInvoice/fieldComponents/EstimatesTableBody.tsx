import { TableCell, TableRow, Typography } from '@mui/material';
import { LabeledCheckBox } from 'kokoas-client/src/components';
import { roundTo } from 'libs';
import { TMaterials, TypeOfForm } from '../form';
import { useFormikContext } from 'formik';
import { produce } from 'immer';

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
    values,
    setValues,
  } = useFormikContext<TypeOfForm>();

  const {
    contractAmount,
    billedAmount,
  } = estimateRow;

  const isRefund = contractAmount < 0;
  const disabled = !isRefund ? contractAmount <= billedAmount : contractAmount >= billedAmount;

  const handleCheck = () => {

    if (values.estimates.find(({ dataId }) => dataId === estimateRow.dataId)) {
      // 既にestimatesに対象の見積もり枝番情報が含まれる場合、対象の見積もり枝番のisShowの値を反転する
      setValues((prev) => produce(prev, (draft) => {
        draft.estimates.map((estimate) => {
          if (estimateRow.dataId !== estimate.dataId) return estimate;
          return ({
            isShow: !estimate.isShow,
          });
        });
      }));
    } else {
      // estimatesにまだ見積もり枝番情報がない場合、追加する
      setValues((prev) => produce(prev, (draft) => {
        draft.estimates.push(estimateRow);
      }));
    }
  };


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
        <LabeledCheckBox
          setCheckedHandler={handleCheck}
          disabled={disabled || isBilled}
        />
      </TableCell>
    </TableRow>
  );
};