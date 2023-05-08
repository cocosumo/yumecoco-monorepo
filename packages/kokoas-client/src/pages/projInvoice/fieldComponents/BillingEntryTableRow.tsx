import { TableCell, TableRow, Typography } from '@mui/material';
import { createPaymentList } from 'api-kintone/src/estimates/createPaymentList';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { FormikMoneyField, FormikSelect } from 'kokoas-client/src/components';
import { ChangeEvent } from 'react';
import { getEstimatesFieldName, TMaterials, TypeOfForm } from '../form';
import WarningIcon from '@mui/icons-material/Warning';

export const BillingEntryTableRow = ({
  estimate,
  idx,
  paymentList,
  isBilled,
}: {
  estimate: TMaterials
  idx: number
  paymentList: ReturnType<typeof createPaymentList>[] | undefined
  isBilled: boolean
}) => {
  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const {
    projTypeName,
    estimateId,
    dataId,
    contractAmount,
    billedAmount,
    billingAmount,
    amountType,
  } = estimate;

  const paymentItem = paymentList?.find(({ uuid }) => uuid === estimateId);
  const paymentTypeOption = paymentItem?.paymentTypeList.map((item) => {
    return ({
      label: item,
      value: item,
    });
  });

  const billingAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => {
      const newVal = produce(prev, (draft) => {
        draft.estimates[idx].billingAmount = Number(e.target.value ?? 0);
      });

      return newVal;
    });
  };

  const amountTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arrayIdx = paymentTypeOption?.findIndex(({ value }) => value === e.target.value) ?? 0;

    setValues((prev) => {
      const newVal = produce(prev, (draft) => {
        draft.estimates[idx].billingAmount = Number(paymentItem?.paymentAmtPerType?.[arrayIdx] ?? 0) ;
      });

      return newVal;
    });
  };

  const newBillingAmount = (+billedAmount + +billingAmount);
  let rowAmountExceeded = false;
  if (+contractAmount >= 0) {
    rowAmountExceeded = (+contractAmount < newBillingAmount) || (+billingAmount < 0);
  } else {
    rowAmountExceeded = (+contractAmount > newBillingAmount) || (+billingAmount > 0);
  }


  return (
    <TableRow>
      <TableCell>
        {projTypeName}
      </TableCell>
      <TableCell align="right">
        <Typography sx={{ color: isBilled ? 'gray' : 'text.primary' }} >
          {dataId.split('-').at(-1)}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {!isBilled &&
          <FormikSelect
            name={getEstimatesFieldName(idx, 'amountType')}
            options={paymentTypeOption}
            onChange={amountTypeChange}
            size={'small'}
          />}
        {isBilled &&
          <Typography sx={{ color: 'gray' }}>
            {amountType}
          </Typography>}
      </TableCell>
      <TableCell align="right">
        {!isBilled &&
          <FormikMoneyField
            name={getEstimatesFieldName(idx, 'billingAmount')}
            size={'small'}
            onChange={billingAmountChange}
            disabled={isBilled}
            sx={{ textAlign: 'right' }}
          />}          
        {isBilled &&
          <Typography sx={{ color: 'gray' }}>
            {billingAmount}
          </Typography>}
      </TableCell>
      <TableCell>
        {rowAmountExceeded && <WarningIcon color='warning' />}
      </TableCell>
    </TableRow>
  );
};
