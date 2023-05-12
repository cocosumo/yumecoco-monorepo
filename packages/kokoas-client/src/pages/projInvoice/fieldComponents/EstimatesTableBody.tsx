import { TableCell, TableRow, Typography } from '@mui/material';
import { LabeledCheckBox } from 'kokoas-client/src/components';
import { roundTo } from 'libs';
import { EstimateRow, TMaterials, TypeOfForm } from '../form';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { v4 as uuidV4 } from 'uuid';



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
  const isExist = values.contracts.find(({ dataId }) => dataId === estimateRow.dataId);

  const handleCheck = () => {

    if (isExist) {
      // 既にestimatesに対象の見積もり枝番情報が含まれる場合、対象の見積もり枝番のisShowの値を反転する
      setValues((prev) => produce(prev, (draft) => {
        draft.contracts = draft.contracts.map((contract) => {
          if (estimateRow.dataId !== contract.dataId) return contract;
          return ({
            ...contract,
            isShow: !contract.isShow,
          });
        });
      }));
    } else {
      // estimatesにまだ見積もり枝番情報がない場合、追加する
      const newEstimateRow: EstimateRow = {
        ...estimateRow,
        estimateIndex: uuidV4(),
        isShow: true,
      };
      setValues((prev) => produce(prev, (draft) => {
        draft.contracts.push(newEstimateRow);
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
          checked={isExist?.isShow}
          setCheckedHandler={handleCheck}
          disabled={disabled || isBilled}
        />
      </TableCell>
    </TableRow>
  );
};