import { TableCell, TableRow, Typography } from '@mui/material';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { roundTo } from 'libs';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { getEstimatesFieldName, TMaterials } from '../form';
import { useURLParams } from '../../../hooks/useURLParams';

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
}: {
  estimateRow: TMaterials
}) => {

  const navigate = useNavigate();

  const {
    invoiceId: projInvoiceIdFromURL,
    custGroupId: custGroupIdFromURL,
    projEstimateId: estimateIdFromURL,
  } = useURLParams();


  const {
    contractAmount,
    billedAmount,
    estimateId,
  } = estimateRow;

  const handleChange = (checked: boolean) => {
    const estimateIdArray = (estimateIdFromURL)?.split(', ') ?? [];
    const newEstimateIdArray = checked
      ? [...estimateIdArray, estimateId]
      : estimateIdArray.filter((id) => id !== estimateId);

    const urlParams = (projInvoiceIdFromURL) ?
      generateParams({
        invoiceId: projInvoiceIdFromURL,
        projEstimateId: newEstimateIdArray?.join(', '),
      }) :
      generateParams({
        custGroupId: custGroupIdFromURL,
        projEstimateId: newEstimateIdArray?.join(', '),
      });

    navigate(`${pages.projInvoice}?${urlParams}`);
  };

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
          disabled={disabled}
        />
      </TableCell>
      <TableCell align="right">
        {/* 契約金額 */}
        <CellContent
          content={roundTo(+estimateRow.contractAmount).toLocaleString()}
          disabled={disabled}
        />
      </TableCell>
      <TableCell align="right">
        {/* 請求済み金額 */}
        <CellContent
          content={roundTo(+estimateRow.billedAmount).toLocaleString()}
          disabled={disabled}
        />
      </TableCell>
      <TableCell>
        {/* 請求に使用する */}
        <FormikLabeledCheckBox
          name={getEstimatesFieldName(+estimateRow.estimateIndex, 'isForPayment')}
          onChange={(_, checked) => handleChange(checked)}
          disabled={disabled}
        />
      </TableCell>
    </TableRow>
  );
};